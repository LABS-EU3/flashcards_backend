const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
} = require('./controller');
const { authorized } = require('../auth/middlewares');

router.post('/', authorized, addDeck);
router.get('/', authorized, getAllDecks);
router.get('/:id', authorized, getDeck);
router.put('/:id', authorized, updateDeck);
router.delete('/:id', authorized, deleteDeck);

module.exports = router;
