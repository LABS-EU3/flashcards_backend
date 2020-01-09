const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
} = require('./controller');

const { deckExists } = require('./middlewares');

const { authorized } = require('../global/middlewares');

router.post('/', authorized, addDeck);
router.get('/', authorized, getAllDecks);
router.get('/:id', authorized, getDeck);
router.put('/:id', authorized, deckExists, updateDeck);
router.delete('/:id', authorized, deckExists, deleteDeck);

module.exports = router;
