const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');
const flashcardsRouter = require('../resources/flashcards/flashcardsRouter');
const deckRouter = require('../resources/decks/router');

appRouter.use('/auth', authRouter);
appRouter.use('/card', flashcardsRouter);
appRouter.use('/decks', deckRouter);

module.exports = appRouter;
