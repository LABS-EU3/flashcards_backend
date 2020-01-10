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

exports.getByUser = id => {
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
    )
    .where({ 'd.user_id': id });
};

exports.add = async deck => {
  const newDeck = await db('decks')
    .insert(deck)
    .returning('*');
  return newDeck;
};

exports.findById = id => {
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
    )
    .where({ 'd.id': id })
    .returning('*');
};

exports.remove = id => {
  return db('decks')
    .where({ id })
    .del();
};

exports.update = (name, id) => {
  return db('decks')
    .where({ id })
    .update({ name });
};

const getDeckTagById = id => {
  return db('deck_tags')
    .where({ id })
    .first();
};

exports.addDeckTag = (tagId, deckId) => {
  return db('deck_tags')
    .insert({ deck_id: deckId, tag_id: tagId })
    .then(id => {
      getDeckTagById({ id: id[0] });
    });
};

exports.removeDeckTag = (tagId, deckId) => {
  return db('deck_tags')
    .where({ deck_id: deckId, tag_id: tagId })
    .del();
};

exports.findTagByName = tag => {
  return db('tags')
    .where({ name: tag })
    .returning('*');
};

exports.findTagById = id => {
  return db('tags')
    .where({ id })
    .returning('*');
};

exports.findDeckTag = (tagId, deckId) => {
  return db('deck_tags')
    .where({ deck_id: deckId, tag_id: tagId })
    .returning('*');
};

exports.allTagsByDeck = deckId => {
  return db('deck_tags')
    .where({ deck_id: deckId })
    .returning('*');
};
