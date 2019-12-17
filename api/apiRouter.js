const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');

appRouter.use('/auth', authRouter);

module.exports = appRouter;
