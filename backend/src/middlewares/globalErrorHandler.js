const { SERVER_ERROR, SERVER_ERROR_TEXT } = require('../utils/constants');

const errorHandler = (req, res, next, err) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? SERVER_ERROR_TEXT : message,
  });

  next();
};

module.exports = errorHandler;
