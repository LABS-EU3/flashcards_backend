const appRouter = require('express').Router();

const authRouter = require('../resources/auth/router');
const deckRouter = require('../resources/decks/router');

appRouter.use('/auth', authRouter);
appRouter.use('/decks', deckRouter);

module.exports = appRouter;
