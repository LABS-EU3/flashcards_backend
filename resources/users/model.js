const db = require('../../data/dbConfig');

exports.remove = id => {
  return db('users')
    .where({ id })
    .del();
};

exports.checkUserHasScore = userId => {
  return db('rankings')
    .where({ user_id: userId })
    .first();
};

exports.rankUser = ({ userId, score }) => {
  return db('rankings').insert({ user_id: userId, score }, 'score');
};

exports.updateRank = ({ userId, newScore }) => {
  return db('ratings')
    .where({ user_id: userId })
    .update({ score: newScore });
};
