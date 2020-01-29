const express = require('express');

const { deleteUser } = require('./controller');

const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.delete('/:id', authorized, deleteUser);

module.exports = userRouter;
