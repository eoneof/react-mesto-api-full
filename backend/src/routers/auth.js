const publicRouter = require('express').Router();

const { validateUserCredentials } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/authorization');
const { checkPublicRequests } = require('../utils/utils');

module.exports = publicRouter
  .get('/signin', checkPublicRequests)
  .get('/signup', checkPublicRequests)
  .post('/signin', validateUserCredentials, login)
  .post('/signup', validateUserCredentials, createUser);
