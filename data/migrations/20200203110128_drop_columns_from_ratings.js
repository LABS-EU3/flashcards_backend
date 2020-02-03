exports.up = function(knex) {
  return knex.schema.table('ratings', table => {
    table.dropColumn('deck_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('ratings', table => {
    table
      .integer('deck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('decks');
  });
};
