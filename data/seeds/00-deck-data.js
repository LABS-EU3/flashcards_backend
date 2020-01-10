exports.seed = function(knex) {
  return knex('decks')
    .del()
    .then(function() {
      return knex('decks').insert([
        { id: 1, name: 'Statistical Learning' },
        { id: 2, name: 'Network Security' },
        { id: 3, name: 'Love' },
      ]);
    });
};
