const db = require('../../data/dbConfig.js');

exports.getAll = () => {
  return db('deck_tags as dt')
    .rightJoin('decks as d', 'd.id', 'dt.deck_id')
    .leftJoin('tags as t', 't.id', 'dt.tag_id')
    .select(
      'dt.deck_id',
      'd.user_id',
      'd.name as deck_name',
      'd.public',
      'd.created_at',
      'd.updated_at',
      db.raw('ARRAY_AGG(t.name) as tags')
    )
    .groupBy(
      'dt.deck_id',
      'd.user_id',
      'd.name',
      'd.public',
      'd.created_at',
      'd.updated_at'
    );
};

exports.add = async deck => {
  const [newDeck] = await db('decks')
    .insert(deck)
    .returning('*');
  return newDeck;
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
