const db = require('../../data/dbConfig.js');

function getAll() {
  return db('decks');
}

async function add(deck) {
  const newDeck = await db('decks')
    .insert(deck)
    .returning('*');
  return newDeck;
}

function findBy(filter) {
  return db('decks').where(filter);
}

function findById(id) {
  return db('decks')
    .where({ id })
    .first();
}

function remove(id) {
  return db('decks')
    .where({ id })
    .del();
}

function update(data, id) {
  const updateFields = Object.keys(data);
  return db('decks')
    .where({ id })
    .update(data, updateFields);
}

module.exports = {
  getAll,
  findBy,
  findById,
  remove,
  update,
  add,
};
