const express = require('express');

const {
  makeCard,
  fetchCardById,
  fetchAllCardsByUser,
  deleteCard,
  editCard,
} = require('./controller');
const { flashCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/', validate(flashCardSchema), makeCard);
flashcardsRouter.get('/users/:userId', fetchAllCardsByUser);
flashcardsRouter.get('/:id', fetchCardById);
flashcardsRouter.put('/:id', validate(flashCardSchema), editCard);
flashcardsRouter.delete('/:id', deleteCard);

module.exports = flashcardsRouter;
