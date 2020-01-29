const express = require('express');

const {
  fetchSessionById,
  getUserSessions,
  makeSession,
  modifySession,
  removeSession,
} = require('./controller');

const {
  cardExists,
  deckExists,
  cardAlreadyMarked,
  sesssionExists,
  cardBelongsToDeck,
} = require('./middleware');

const sessionRouter = express.Router();

sessionRouter.get('/', getUserSessions);

sessionRouter.post('/', deckExists, makeSession);

sessionRouter.get('/:sessionId', sesssionExists, fetchSessionById);

sessionRouter.put(
  '/:sessionId',
  sesssionExists,
  cardExists,
  cardAlreadyMarked,
  cardBelongsToDeck,
  modifySession
);

sessionRouter.delete('/:sessionId', sesssionExists, removeSession);

module.exports = sessionRouter;
