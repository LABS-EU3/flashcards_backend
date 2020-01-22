const express = require('express');

const {
  makeCard,
  fetchCardById,
  fetchAllCardsByUser,
  deleteCard,
  editCard,
  fetchCardOfTheDay,
} = require('./controller');
const { flashCardSchema } = require('./flashcardsSchema');
const validate = require('../../utils/validate');
const { cardExists, userOwnsCard } = require('./middlewares');

const flashcardsRouter = express.Router();

flashcardsRouter.post('/', validate(flashCardSchema), makeCard);
flashcardsRouter.get('/', fetchAllCardsByUser);
flashcardsRouter.get('/COTD', fetchCardOfTheDay);
flashcardsRouter.get('/:id', cardExists, fetchCardById);
flashcardsRouter.put(
  '/:id',
  cardExists,
  userOwnsCard,
  validate(flashCardSchema),
  editCard
);
flashcardsRouter.delete('/:id', userOwnsCard, cardExists, deleteCard);

module.exports = flashcardsRouter;
