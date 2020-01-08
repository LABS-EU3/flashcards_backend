const express = require('express');

const {
  makeCard,
  fetchCardById,
  fetchAllCardsByUser,
  deleteCard,
  editCard,
} = require('./controller');
const { createCardSchema, editCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/', validate(createCardSchema), makeCard);
flashcardsRouter.get('/users/:userId', fetchAllCardsByUser);
flashcardsRouter.get('/:id', fetchCardById);
flashcardsRouter.put('/:id', validate(editCardSchema), editCard);
flashcardsRouter.delete('/:id', deleteCard);

module.exports = flashcardsRouter;
