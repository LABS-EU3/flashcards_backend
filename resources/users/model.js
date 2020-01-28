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
