exports.seed = function(knex) {
  return knex('decks')
    .del()
    .then(function() {
      return knex('decks').insert([
        { id: 1, name: 'Statistical Learning', user_id: 1, public: true },
        { id: 2, name: 'General Science', user_id: 2, public: false },
        { id: 3, name: 'Technology ', user_id: 3, public: true },
        { id: 4, name: 'Biology ', user_id: 4, public: true },
        { id: 5, name: 'Basic General Knowledge', user_id: 5, public: true },
        { id: 6, name: 'Famous Personalities', user_id: 6, public: true },
        { id: 7, name: 'Network Security', user_id: 7, public: false },
      ]);
    });
};
