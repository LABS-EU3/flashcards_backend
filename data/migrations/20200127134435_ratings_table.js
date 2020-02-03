exports.up = function(knex) {
  return knex.schema.createTable('ratings', table => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    table
      .integer('card_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('flashcards');

    table
      .integer('deck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('decks');

    table.integer('rating').notNullable();

    // table.primary(['user_id', 'card_id']);
    table.increments();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ratings');
};
