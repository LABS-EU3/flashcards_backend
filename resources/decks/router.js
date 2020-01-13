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
const {
  deckExists,
  preventDuplicateTags,
  tagsExists,
} = require('./middlewares');
const { checkId } = require('../global/middlewares');

router.post('/', validate(deckSchema), tagsExists, addDeck);
router.get('/', getAllDecks);
router.get('/:id', checkId, deckExists, getDeck);
router.put(
  '/:id',
  validate(deckSchema),
  checkId,
  deckExists,
  tagsExists,
  preventDuplicateTags,
  updateDeck
);
router.delete('/:id', checkId, deckExists, deleteDeck);

module.exports = router;
