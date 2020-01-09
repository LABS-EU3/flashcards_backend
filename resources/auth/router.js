const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  confirmEmail,
  viewProfile,
} = require('./controller');
const {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./authSchema');
const validate = require('../../utils/validate');
const {
  checkUserExists,
  checkEmailExists,
  validateEmailToken,
  validateResetToken,
} = require('./middlewares');

const { authorized } = require('../global/middlewares');

const authRouter = express.Router();

authRouter.post('/register', validate(signUpSchema), checkUserExists, signup);
authRouter.post('/login', validate(loginSchema), checkEmailExists, login);
authRouter.post(
  '/forgot_password',
  validate(forgotPasswordSchema),
  forgotPassword
);
authRouter.post(
  '/reset_password/:token',
  validate(resetPasswordSchema),
  validateResetToken,
  resetPassword
);

authRouter.post('/confirm_email', validateEmailToken, confirmEmail);

authRouter.get('/view_profile', authorized, viewProfile);

module.exports = authRouter;
