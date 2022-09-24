require('dotenv').config();
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const { NODE_ENV, PORT = 3001, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const routers = require('./src/routers/routers');
const notFoundHandler = require('./src/controllers/notFound');
const globalErrorHandler = require('./src/middlewares/globalErrorHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/loggers');
const { logEventsToConsole, logEventsToFile } = require('./src/utils/utils');
const crashTest = require('./src/routers/crashTest');

const {
  SERVER_STARTED_TEXT, SERVER_START_FAILED_TEXT, ALLOWED_CORS, ALLOWED_METHODS, ALLOWED_HEADERS,
} = require('./src/utils/constants');

const corsOptions = {
  origin: ALLOWED_CORS,
  methods: ALLOWED_METHODS,
  allowedHeaders: ALLOWED_HEADERS,
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet.hidePoweredBy());

app.use(express.json()); // body-parser is bundled with Express >4.16
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(crashTest);
app.use(routers);

app.use(notFoundHandler);

// eslint-disable-next-line consistent-return
async function main() {
  try {
    await mongoose.connect(DB_ADDRESS);
    await app.listen(PORT);
    if (NODE_ENV === 'production') {
      logEventsToFile.info(`${SERVER_STARTED_TEXT} ${PORT}`);
    } else {
      logEventsToConsole(`${SERVER_STARTED_TEXT} ${PORT}`);
    }
  } catch (err) {
    if (NODE_ENV === 'production') {
      logEventsToFile.info(SERVER_START_FAILED_TEXT);
    } else {
      logEventsToConsole(SERVER_START_FAILED_TEXT);
    }
    throw new Error(SERVER_START_FAILED_TEXT, err);
  }
}

main();

app.use(errorLogger);
app.use(errors());
app.use(globalErrorHandler);
process.on('uncaughtException', (err, origin) => {
  errorLogger(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
