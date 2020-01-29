exports.up = function(knex) {
  return knex.schema.createTable('sessions', table => {
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
    table.boolean('isCompleted').defaultTo(false);
    table.timestamp('last_used').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sessions');
};
