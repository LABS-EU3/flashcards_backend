const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  getUsersDeck,
} = require('./controller');

const { deckExists } = require('./middlewares');

const { authorized } = require('../global/middlewares');

router.post('/', authorized, addDeck);
router.get('/', authorized, getAllDecks);
router.get('/users/', authorized, getUsersDeck);
router.get('/:id', authorized, getDeck);
router.put('/:id', authorized, deckExists, updateDeck);
router.delete('/:id', authorized, deckExists, deleteDeck);

module.exports = router;
