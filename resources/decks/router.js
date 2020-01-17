const router = require('express').Router();

const {
  addDeck,
  getUsersDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  getAllDecks,
} = require('./controller');
const validate = require('../../utils/validate');
const { deckSchema, editDeckSchema } = require('./schema');
const {
  deckExists,
  tagsExists,
  preventDuplicateTags,
  userOwnsDeck,
} = require('./middlewares');
const { checkId } = require('../global/middlewares');

router.post('/', validate(deckSchema), tagsExists, addDeck);
router.get('/', getUsersDecks);
router.get('/public', getAllDecks);
router.get('/:id', checkId, deckExists, getDeck);
router.put(
  '/:id',
  validate(editDeckSchema),
  userOwnsDeck,
  checkId,
  deckExists,
  tagsExists,
  preventDuplicateTags,
  updateDeck
);
router.delete('/:id', checkId, userOwnsDeck, deckExists, deleteDeck);

module.exports = router;
