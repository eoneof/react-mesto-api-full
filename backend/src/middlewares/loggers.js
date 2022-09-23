const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log' }),
  ],
  format: winston.format.json(),
});

const eventLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/events.log' }),
  ],
});

module.exports = { requestLogger, eventLogger, errorLogger };
