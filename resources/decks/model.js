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
      db.raw('ARRAY_AGG( DISTINCT t.name) as tags')
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
  return db('deck_tags as dt')
    .rightJoin('decks as d', 'd.id', 'dt.deck_id')
    .leftJoin('tags as t', 't.id', 'dt.tag_id')
    .leftJoin('flashcards as f', 'f.deck_id', 'dt.deck_id')
    .select(
      'dt.deck_id',
      'd.user_id',
      'd.name as deck_name',
      'd.public',
      'd.created_at',
      'd.updated_at',
      db.raw('array_to_json(ARRAY_AGG( DISTINCT t)) as tags'),
      db.raw('array_to_json(ARRAY_AGG( DISTINCT f)) as flashcards')
    )
    .groupBy(
      'dt.deck_id',
      'd.user_id',
      'd.name',
      'd.public',
      'd.created_at',
      'd.updated_at'
    )
    .where({ 'd.user_id': id })
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

const getDeckTagById = id => {
  return db('deck_tags')
    .where({ id })
    .first();
};

exports.addDeckTag = newDeckTag => {
  return db('deck_tags')
    .insert(newDeckTag)
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
    .first();
};

exports.findTagById = id => {
  return db('tags')
    .where({ id })
    .first();
};

exports.findDeckTag = (tagId, deckId) => {
  return db('deck_tags')
    .where({ deck_id: deckId, tag_id: tagId })
    .first();
};

exports.allTagsByDeck = deckId => {
  return db('deck_tags').where({ deck_id: deckId });
};
