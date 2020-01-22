const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  confirmEmail,
  viewProfile,
  authGoogle,
  completeGoogleAuth,
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
  validateToken,
  validateResetToken,
} = require('./middlewares');

const { authorized } = require('../global/middlewares');

const googlePassport = require('../../utils/googlePassport');

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

authRouter.post('/confirm_email', validateToken, confirmEmail);

authRouter.get('/view_profile', authorized, viewProfile);

authRouter.get(
  '/google',
  googlePassport.Passport.authenticate('google', {
    scope: ['openid email profile'],
  })
);

authRouter.get(
  '/google/callback',
  googlePassport.Passport.authenticate('google', {
    failureRedirect: 'https://site.quickdecksapp.com/',
  }),
  authGoogle
);

authRouter.post('/google/:token', completeGoogleAuth);

module.exports = authRouter;
