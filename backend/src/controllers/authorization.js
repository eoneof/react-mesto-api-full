require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : '123-ABC-XYZ';

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const {
  CREATED,
  SALT_ROUNDS,
  EMAIL_EXIST_TEXT,
  JWT_EXPIRATION_TIMEOUT,
  BAD_REQUEST_TEXT,
  DB_DUPLICATE_KEY_CODE,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(CREATED).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(BAD_REQUEST_TEXT));
          return;
        }

        if (err.code === DB_DUPLICATE_KEY_CODE) {
          next(new ConflictError(EMAIL_EXIST_TEXT));
          return;
        }
        next(err);
      });
  });
};

/**
 * @returns {{ token: string}} JWT token
 */
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIMEOUT,
      });

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  login,
};
