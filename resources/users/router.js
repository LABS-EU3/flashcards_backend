const express = require('express');

const { deleteUser, getUserScore, getLeaderboard } = require('./controller');

const userRouter = express.Router();

userRouter.delete('/:id', deleteUser);

userRouter.get('/:id/score', getUserScore);

userRouter.get('/leaderboard', getLeaderboard);

module.exports = userRouter;
