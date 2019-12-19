const express = require('express');
const {
  signup,
  login,
  requestResetToken,
  checkResetTokenAndChangePWD,
} = require('./controller');

const validate = require('../../utils/validate');
const {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
} = require('./authSchema');
const { checkUserExists, checkEmailExists } = require('./middlewares');

const authRouter = express.Router();

authRouter.post('/register', validate(signUpSchema), checkUserExists, signup);
authRouter.post('/login', validate(loginSchema), checkEmailExists, login);
authRouter.post(
  '/forgot_password',
  validate(forgotPasswordSchema),
  requestResetToken
);
authRouter.post('/reset_password', checkResetTokenAndChangePWD);

module.exports = authRouter;
