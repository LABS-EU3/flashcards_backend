const db = require('../../data/dbConfig');

exports.createUser = user => {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return this.filter({ id });
    });
};

// Filter function can be used to obtain a record by any column name
// As long as the filter param is an object in the form:
// {<column_name> : <column_value>}

exports.filter = filter => {
  return db('users')
    .select('id', 'full_name', 'email', 'image_url', 'isConfirmed')
    .where(filter)
    .first();
};

// The findBy function is used when comparing passwords from the user on login
// And password stored in the db

exports.findBy = param => {
  return db('users')
    .select('id', 'full_name', 'email', 'password', 'isConfirmed')
    .where(param)
    .first();
};

// takes email, returns token (send token).
exports.insertResetToken = (userId, token) => {
  return db('reset_password').insert(userId, token);
};

exports.revokeResetToken = token => {
  return db('reset_password')
    .update('active', null)
    .where('token', token);
};

exports.filterForToken = token => {
  return db('reset_password')
    .select('user_id', 'token', 'active')
    .where(token)
    .groupBy('active', 'token', 'user_id')
    .havingNotNull('active');
};

exports.changePassword = (userId, password) => {
  return db('users')
    .where({ id: userId })
    .update('password', password);
};
