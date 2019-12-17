const express = require('express');
const { signup, login } = require('./controller');

const validate = require('../../utils/validate');
const authSchema = require('./authSchema');
const { checkUserExists } = require('./middlewares');

const authRouter = express.Router();

authRouter.post('/register', validate(authSchema), checkUserExists, signup);
authRouter.post('/login', login);

module.exports = authRouter;
