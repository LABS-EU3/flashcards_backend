const express = require('express');
const { signup } = require('./controller');

const validate = require('../../utils/validate');
const authSchema = require('./authSchema');

const authRouter = express.Router();

authRouter.post('/register', validate(authSchema), signup);

module.exports = authRouter;
