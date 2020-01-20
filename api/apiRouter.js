const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');
const flashcardsRouter = require('../resources/flashcards/router');
const deckRouter = require('../resources/decks/router');
const { authorized } = require('../resources/global/middlewares');

appRouter.use('/auth', authRouter);
appRouter.use('/decks', authorized, deckRouter);
appRouter.use('/cards', authorized, flashcardsRouter);

module.exports = appRouter;
