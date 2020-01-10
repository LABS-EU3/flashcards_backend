const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  getUsersDeck,
} = require('./controller');

const {
  deckExists,
  preventDuplicateTags,
  tagsExists,
} = require('./middlewares');

const { authorized } = require('../global/middlewares');

router.post('/', authorized, tagsExists, addDeck);
router.get('/', authorized, getAllDecks);
router.get('/users/', authorized, getUsersDeck);
router.get('/:id', authorized, getDeck);
router.put(
  '/:id',
  authorized,
  deckExists,
  tagsExists,
  preventDuplicateTags,
  updateDeck
);
router.delete('/:id', authorized, deckExists, deleteDeck);

module.exports = router;
