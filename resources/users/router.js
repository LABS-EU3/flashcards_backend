const express = require('express');

const { deleteUser, getUserScore, getLeaderboard } = require('./controller');

const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.delete('/:id', authorized, deleteUser);

userRouter.get('/:id/score', getUserScore);

userRouter.get('/leaderboard', getLeaderboard);

module.exports = userRouter;
