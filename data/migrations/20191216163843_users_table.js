exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table
      .string('full_name')
      .notNullable()
      .unique();
    table.string('image_url').notNullable();
    table.boolean('isConfirmed').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
