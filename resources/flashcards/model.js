const db = require('../../data/dbConfig');

const getCardById = id => {
  return db('flashcards')
    .where({ id })
    .first();
};

exports.getCardById = id => {
  return db('flashcards')
    .where({ id })
    .first();
};

exports.getAllCardsByUser = userId => {
  return db('flashcards').where({ user_id: userId });
};

exports.createCard = card => {
  return db('flashcards')
    .insert(card, 'id')
    .then(ids => getCardById(ids[0]));
};

exports.removeCard = id => {
  return db('flashcards')
    .where({ id })
    .del();
};

exports.updateCard = (id, card) => {
  return db('flashcards')
    .where({ id })
    .update(card)
    .then(() => getCardById(id));
};

exports.flashcardOfTheDay = userId => {
  return db('flashcards')
    .where({ user_id: userId })
    .orderByRaw('random()')
    .limit(1);
};

// eslint-disable-next-line camelcase
exports.scoreCard = cardScore => {
  return db('ratings').insert(cardScore);
};

exports.rescoreCard = cardScore => {
  return db('ratings')
    .where({
      card_id: cardScore.card_id,
      deck_id: cardScore.deck_id,
      user_id: cardScore.user_id,
    })
    .update({ rating: cardScore.rating });
};
