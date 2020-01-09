const request = require('supertest');
const server = require('../../api/server');
const deckModel = require('../decks/model');
const userModel = require('../auth/model');
const db = require('../../data/dbConfig');

const userObject = {
  email: 'h.kakashi@gmail.com',
  password: 'aVeryLongPassword',
  full_name: 'Hatake Kakashi',
  image_url: 'google.com',
  isConfirmed: false,
};

let user = {};
let deck = {};

beforeEach(async () => {
  await db.raw('TRUNCATE TABLE users, decks CASCADE');
  await userModel.createUser(userObject).then(async () => {
    user = await userModel.filter({ email: userObject.email });
    deckModel.add({
      name: 'TestDeck',
      user_id: user.id,
    });
    deck = await deckModel.findBy({ name: 'TestDeck' });
  });
});

afterAll(async () => {
  await db.destroy();
});

const flashcardObject = {
  deckId: deck.id,
  userId: user.id,
  questionText: 'When will AI takeover',
  answerText: 'What idk',
  imageUrl: 'https://robots.ieee.org/robots/cb2/Photos/SD/cb2-photo1-full.jpg',
};

// const editFlashcardObject = {
//   questionText: 'When will AI takeover',
//   answerText: 'It already has',
//   imageUrl:
// 'https://robots.ieee.org/robots/cb2/Photos/SD/cb2-photo1-full.jpg',
// };

describe('Flashcards Router', () => {
  describe('[POST] /api/cards/', () => {
    test('Returns 201 on success', async () => {
      const res = await await request(server)
        .post('/api/cards')
        .send(flashcardObject);
      expect(res.status).toBe(201);
    });

    test('Returns created user without their password', async () => {});

    test('Token is returned on signup successful', async () => {});

    test('Password is not stored in plain text', async () => {});

    test('Email is required', async () => {});

    test('Password is required', async () => {});

    test('Full Name is required', async () => {});

    test('imageUrl and isConfirmed are not required', async () => {});

    test('Email cannot belong to multiple users', async () => {});
  });

  describe('[GET] /api/cards/users/:userId', () => {
    test('Returns 200 OK on successful login', async () => {});

    test('Token is returned on successful login', async () => {});

    test('Provided Email does not exist', async () => {});

    test('Provided password is invalid', async () => {});

    test('Email is required', async () => {});

    test('Password is required', async () => {});
  });

  describe('[GET] /api/cards/:id', () => {
    test('Validation works', async () => {});
  });

  describe('[PUT] /api/cards/:id', () => {
    test('Get email sent to reset password if forgotten', async () => {});

    test('Email is sent', async () => {});

    test('Will not get an email sent if wrong email', async () => {});
  });

  describe('[DELETE] /api/cards/:id', () => {
    test('Cannot reset password if not valid token', async () => {});

    test('User can reset password, testing if token is valid', async () => {});
  });
});
