exports.up = function(knex) {
  return knex.schema.table('flascards', table => {
    table.string('image_url_answer');
  });
};

exports.down = function(knex) {
  return knex.schema.table('flashcards', table => {
    table.dropColumn('image_url_answer');
  });
};
