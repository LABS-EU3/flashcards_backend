const express = require('express');

const {
  deleteUser,
  getUserScore,
  getLeaderboard,
  updateUserProfile,
} = require('./controller');

const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.delete('/:id', authorized, deleteUser);

userRouter.get('/:id/score', authorized, getUserScore);

userRouter.get('/leaderboard', getLeaderboard);

userRouter.post('/updateprofile', updateUserProfile);

module.exports = userRouter;
