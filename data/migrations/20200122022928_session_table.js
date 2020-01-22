exports.up = function(knex) {
  return knex.schema.createTable('rating', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table
      .integer('deck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('decks');
    table.boolean('isComplete').defaultTo(false);
    table.integer('stopped_index');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rating');
};
