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

sessionRouter.get('/:id', sesssionExists, fetchSessionById);

sessionRouter.put(
  '/:id',
  sesssionExists,
  cardExists,
  cardAlreadyMarked,
  cardBelongsToDeck,
  modifySession
);

sessionRouter.delete('/:id', sesssionExists, removeSession);

module.exports = sessionRouter;
