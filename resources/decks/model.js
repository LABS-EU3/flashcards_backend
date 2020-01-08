const db = require('../../data/dbConfig.js');

exports.getAll = () => {
  return db('decks');
};

exports.add = async deck => {
  const newDeck = await db('decks')
    .insert(deck)
    .returning('*');
  return newDeck;
};

exports.findBy = filter => {
  return db('decks').where(filter);
};

exports.findById = id => {
  return db('decks')
    .where({ id })
    .first();
};

exports.remove = id => {
  return db('decks')
    .where({ id })
    .del();
};

exports.update = (data, id) => {
  const updateFields = Object.keys(data);
  return db('decks')
    .where({ id })
    .update(data, updateFields);
};
