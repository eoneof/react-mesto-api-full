require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
  TOKEN_PREFIX,
  AUTH_REQUIRED_TEXT,
  TOKEN_EXPIRED_TEXT,
} = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : '123-ABC-XYZ';

// eslint-disable-next-line consistent-return
const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
    next(new ForbiddenError(AUTH_REQUIRED_TEXT));
    return;
  }

  const token = authorization.replace(TOKEN_PREFIX, '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(TOKEN_EXPIRED_TEXT));
    return;
  }
  req.user = payload;

  next();
};

module.exports = authorize;
