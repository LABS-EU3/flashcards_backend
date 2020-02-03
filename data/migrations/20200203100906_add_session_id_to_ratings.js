exports.up = function(knex) {
  return knex.schema.table('ratings', table => {
    table
      .integer('session_id')
      .unsigned()
      .notNullable()
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
