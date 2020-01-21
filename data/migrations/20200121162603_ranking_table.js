exports.up = function(knex) {
  return knex.schema.createTable('ranking', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('score')
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ranking');
};
