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
    .select('full_name', 'email', 'image_url', 'isConfirmed')
    .where(filter)
    .first();
};

// FindBy is used when comparing passwords from the user on login
// And password stored in the db

exports.findBy = param => {
  return db('users')
    .select('full_name', 'email', 'password', 'isConfirmed')
    .where(param)
    .first();
};
