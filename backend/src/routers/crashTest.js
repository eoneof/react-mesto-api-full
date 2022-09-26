// TODO: remove this route

const crashTest = require('express').Router();

module.exports = crashTest
  .get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });
