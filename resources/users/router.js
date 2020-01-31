const express = require('express');

const { deleteUser, getUserScore, getLeaderboard } = require('./controller');
const { validateUserPassword } = require('./middlewares');
const validate = require('../../utils/validate');
const { deleteAccountSchema } = require('./userSchema');

const userRouter = express.Router();

userRouter.delete(
  '/:id',
  validate(deleteAccountSchema),
  validateUserPassword,
  deleteUser
);

userRouter.get('/:id/score', getUserScore);

userRouter.get('/leaderboard', getLeaderboard);

module.exports = userRouter;
