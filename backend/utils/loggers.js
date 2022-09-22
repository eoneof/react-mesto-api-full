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

const getTimeStamp = () => new Date().toUTCString();

// Console colors
const yellow = '\x1b[33m';

const eventLogger = (message) => {
  /* eslint-disable-next-line no-console */
  console.log(yellow, `${getTimeStamp()} ${message}`);
};

module.exports = { requestLogger, eventLogger, errorLogger };
