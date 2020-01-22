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
    table.int('rating').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rating');
};
