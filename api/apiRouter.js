const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');
const flashcardsRouter = require('../resources/flashcards/flashcardsRouter');

appRouter.use('/auth', authRouter);
appRouter.use('/card', flashcardsRouter);

module.exports = appRouter;
