const router = require('express').Router();
const {
  addDeck,
  getAllDecks,
  getDeck,
  deleteDeck,
  updateDeck,
} = require('./controller');

const validate = require('../../utils/validate');
const { deckSchema } = require('./schema');

const { deckExists } = require('./middlewares');

const { authorized, checkId } = require('../global/middlewares');

router.post('/', authorized, validate(deckSchema), addDeck);
router.get('/', authorized, getAllDecks);
router.get('/:id', authorized, checkId, deckExists, getDeck);
router.put(
  '/:id',
  authorized,
  validate(deckSchema),
  checkId,
  deckExists,
  updateDeck
);
router.delete('/:id', authorized, checkId, deckExists, deleteDeck);

module.exports = router;
