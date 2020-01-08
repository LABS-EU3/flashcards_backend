const db = require('../data/dbConfig.js');

function getAll() {
  return db('decks');
}
