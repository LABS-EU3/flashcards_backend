const db = require('../../knexfile');

exports.createUser = user => {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [userId] = ids;
      return this.filter({ id: userId });
    });
};

// Filter function can be used to obtain a record by any column name
// As long as the filter param is an object in the form:
// {<column_name> : <column_value>}

exports.filter = filter => {
  return db('users')
    .select('full_name', 'email', 'image_url', 'isConfirmed')
    .where(filter)
    .first();
};
