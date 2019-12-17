const express = require('express');
const { signup } = require('./controller');

const validate = require('../../utils/validate');
const authSchema = require('./authSchema');
const { checkUserExists } = require('./middlewares');

const authRouter = express.Router();

authRouter.post('/register', validate(authSchema), checkUserExists, signup);

module.exports = authRouter;
