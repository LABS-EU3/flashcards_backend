exports.up = function(knex) {
  return knex.schema.createTable('sessions_tracker', table => {
    table.increments();
    table
      .integer('session_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('sessions')
      .onDelete('CASCADE');
    table
      .integer('card_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('flashcards')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sessions_tracker');
};
