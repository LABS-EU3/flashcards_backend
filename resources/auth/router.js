const express = require('express');
const { signup, login, confirmEmail } = require('./controller');

const validate = require('../../utils/validate');
const { signUpSchema, loginSchema } = require('./authSchema');
const {
  checkUserExists,
  checkEmailExists,
  validateToken,
} = require('./middlewares');

const authRouter = express.Router();

authRouter.post('/register', validate(signUpSchema), checkUserExists, signup);
authRouter.post('/login', validate(loginSchema), checkEmailExists, login);
authRouter.post('/confirmEmail', validateToken, confirmEmail);

module.exports = authRouter;
