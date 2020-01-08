const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
} = require('./controller');

router.post('/', addDeck);

module.exports = router;
