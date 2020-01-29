const express = require('express');

const { userFeedback } = require('./controller');

const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.post('/', authorized, userFeedback);

module.exports = userRouter;
