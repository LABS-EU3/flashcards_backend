const db = require('../../data/dbConfig');

const { checkUserHasScore, rankUser, updateRank } = require('../users/model');

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

exports.checkCardIsRated = ({ userId, cardId }) => {
  return db('ratings')
    .where({
      user_id: userId,
      card_id: cardId,
    })
    .first();
};

const increaseRank = async ({ userId, rating }) => {
  const userHasScore = await checkUserHasScore(userId);
  if (userHasScore) {
    const newScore = Number(userHasScore.score) + Number(rating);

    await updateRank({ userId, newScore });
  } else {
    await rankUser({
      userId,
      score: rating,
    });
  }
};

exports.scoreCard = async cardScoreObject => {
  await increaseRank({
    userId: cardScoreObject.user_id,
    rating: cardScoreObject.rating,
  });

  return db('ratings').insert(cardScoreObject, 'card_id');
};

exports.rescoreCard = async cardScoreObject => {
  await increaseRank({
    userId: cardScoreObject.user_id,
    rating: cardScoreObject.rating,
  });

  return db('ratings')
    .where({
      card_id: cardScoreObject.card_id,
      deck_id: cardScoreObject.deck_id,
      user_id: cardScoreObject.user_id,
    })
    .update({ rating: cardScoreObject.rating });
};
