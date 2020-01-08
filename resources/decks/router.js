const router = require('express').Router();
const { decks } = require('./controller');

router.post('/', decks.addDeck);

module.exports = router;
