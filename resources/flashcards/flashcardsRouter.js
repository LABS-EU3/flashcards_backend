const express = require('express');

const {
  makeCard,
  fetchCardById,
  fetchAllCardsByUser,
  deleteCard,
  editCard,
} = require('./flashcardsController');
const { createCardSchema, editCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');
const { validateCard } = require('./flashcardsMiddlewares');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/', validateCard, validate(createCardSchema), makeCard);
flashcardsRouter.get('/all/:userId', fetchAllCardsByUser);
flashcardsRouter.get('/:id', fetchCardById);
flashcardsRouter.put('/:id', validate(editCardSchema), editCard);
flashcardsRouter.delete('/:id', deleteCard);

module.exports = flashcardsRouter;
