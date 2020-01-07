const db = require('../../data/dbConfig');

function getCardById(id) {
  return db('flashcards')
    .where({ id })
    .first();
}

function createCard(card) {
  return db('flashcards')
    .insert(card, 'id')
    .then(ids => getCardById(ids[0]));
}

module.exports = {
  createCard,
  getCardById,
};
