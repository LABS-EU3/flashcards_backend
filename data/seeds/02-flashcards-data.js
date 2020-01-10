exports.seed = function(knex) {
  return knex('flashcards')
    .del()
    .then(function() {
      return knex('flashcards').insert([
        {
          id: 2,
          deck_id: 1,
          user_id: 1,
          question: 'What is data mining?',
          answer:
            'Its when biotech and infotech merge and people become data mines',
          image_url:
            // eslint-disable-next-line max-len
            'https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,fl_progressive,q_80,w_470/17irehr1akl9yjpg.jpg',
          created_at: '2020-01-08T10:44:38.761Z',
          updated_at: '2020-01-08T10:44:38.761Z',
        },
        {
          id: 3,
          deck_id: 1,
          user_id: 1,
          question: 'Hey Anna hehe sup',
          answer: 'How you doing?',
          image_url: null,
          created_at: '2020-01-08T10:45:05.269Z',
          updated_at: '2020-01-08T10:45:05.269Z',
        },
        {
          id: 5,
          deck_id: 2,
          user_id: 1,
          question: 'here is my question answer me',
          answer: 'here is my answer question me',
          image_url: null,
          created_at: '2020-01-08T11:34:52.174Z',
          updated_at: '2020-01-08T11:34:52.174Z',
        },
        {
          id: 6,
          deck_id: 2,
          user_id: 1,
          question: 'here is my question answer me',
          answer: 'here is my answer question me',
          image_url: null,
          created_at: '2020-01-08T11:34:52.174Z',
          updated_at: '2020-01-08T11:34:52.174Z',
        },
        {
          id: 8,
          deck_id: 3,
          user_id: 1,
          question: 'here is my question answer me',
          answer: 'here is my answer question me',
          image_url: null,
          created_at: '2020-01-08T11:34:52.174Z',
          updated_at: '2020-01-08T11:34:52.174Z',
        },
      ]);
    });
};
