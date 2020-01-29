const db = require('../../data/dbConfig');

exports.filter = filter => {
  return db('users')
    .select('email', 'id')
    .where(filter)
    .first();
};
