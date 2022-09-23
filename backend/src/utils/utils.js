const winston = require('winston');

const timeStamp = () => new Date().toUTCString();

const logEventsToConsole = (message) => {
  /* eslint-disable-next-line no-console */
  console.log(`${timeStamp()} ${message}`);
};

const logEventsToFile = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/events.log' }),
  ],
});

module.exports = { logEventsToConsole, logEventsToFile };
