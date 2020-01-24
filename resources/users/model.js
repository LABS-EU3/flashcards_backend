const db = require('../../data/dbConfig');

exports.remove = id => {
  return db('users')
    .where({ id })
    .del();
};
