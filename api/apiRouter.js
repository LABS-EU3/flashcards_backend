const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');
const flashcardsRouter = require('../resources/flashcards/router');
const deckRouter = require('../resources/decks/router');

appRouter.use('/auth', authRouter);
appRouter.use('/cards', flashcardsRouter);
appRouter.use('/decks', deckRouter);

module.exports = appRouter;
