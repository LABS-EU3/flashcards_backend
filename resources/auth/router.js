const express = require('express');
const {
  signup,
  login,
  requestResetToken,
  checkResetTokenAndChangePWD,
  confirmEmail,
} = require('./controller');

const validate = require('../../utils/validate');
const {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
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

// Temporary endpoint for testing emails, is defined in ENV.
authRouter.get('/reset_password', function(req, res) {
  res.send(req.query.token);
});

authRouter.post(
  '/reset_password',
  validate(resetPasswordSchema),
  checkResetTokenAndChangePWD
);
authRouter.post('/confirmEmail', confirmEmail);

module.exports = authRouter;
