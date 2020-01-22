const router = require('express').Router();

const {
  addDeck,
  getUsersDecks,
  getDeck,
  deleteDeck,
  updateDeck,
  getAllDecks,
  accessDeck,
  recentlyAccessed,
  removeAccessed,
} = require('./controller');
const validate = require('../../utils/validate');
const { deckSchema } = require('./schema');
const {
  deckExists,
  tagsExists,
  preventDuplicateTags,
  userOwnsDeck,
} = require('./middlewares');
const { checkId } = require('../global/middlewares');

router.get('/access', recentlyAccessed);
router.put('/access/:id', deckExists, accessDeck);
router.delete('/access/:id', deckExists, removeAccessed);
router.post('/', validate(deckSchema), tagsExists, addDeck);
router.get('/', getUsersDecks);
router.get('/public', getAllDecks);
router.get('/:id', checkId, deckExists, getDeck);
router.put(
  '/:id',
  validate(deckSchema),
  userOwnsDeck,
  checkId,
  deckExists,
  tagsExists,
  preventDuplicateTags,
  updateDeck
);
router.delete('/:id', checkId, userOwnsDeck, deckExists, deleteDeck);

module.exports = router;
