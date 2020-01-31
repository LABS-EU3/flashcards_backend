const express = require('express');

const {
  deleteUser,
  getUserScore,
  getLeaderboard,
  updateUserProfile,
} = require('./controller');

const validate = require('../../utils/validate');

const { updateUserProfileSchema } = require('./userSchema');

const { authorized } = require('../global/middlewares');

const userRouter = express.Router();

userRouter.delete('/:id', authorized, deleteUser);

userRouter.get('/:id/score', authorized, getUserScore);

userRouter.get('/leaderboard', getLeaderboard);

userRouter.post(
  '/updateprofile',
  authorized,
  validate(updateUserProfileSchema),
  updateUserProfile
);

module.exports = userRouter;
