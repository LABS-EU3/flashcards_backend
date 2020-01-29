const express = require('express');

const {
  fetchSessionById,
  getUserSessions,
  makeSession,
  modifySession,
  removeSession,
} = require('./controller');

const sessionRouter = express.Router();

sessionRouter.get('/', getUserSessions);

sessionRouter.post('/', makeSession);

sessionRouter.get('/:sessionId', fetchSessionById);

sessionRouter.put('/:sessionId', modifySession);

sessionRouter.delete('/:sessionId', removeSession);

module.exports = sessionRouter;
