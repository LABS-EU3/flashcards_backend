exports.up = function(knex) {
  return knex.schema.table('ratings', table => {
    //   Nullable because new column with pre-existing data.
    table
      .integer('session_id')
      .unsigned()
      .references('id')
      .inTable('sessions')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.table('ratings', table => {
    table.dropColumn('session_id');
  });
};
