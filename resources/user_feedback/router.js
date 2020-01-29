const express = require('express');

const { userFeedback } = require('./controller');
// const { checkEmailExists } = require('./middelware');
const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.post('/', authorized, userFeedback);

module.exports = userRouter;
