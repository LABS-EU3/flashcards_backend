const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');

const userObject = {
  fullName: 'Test User',
  email: 'testuser@xyz.com',
  password: 'ALongSecurePassword',
  imageUrl: 'google.com',
};

let user;
let authToken;

beforeEach(async done => {
  await db.raw(
    'TRUNCATE TABLE users, reset_password, decks, flashcards CASCADE'
  );
  await db.seed.run({
    specific: '03-tags-data.js',
  });
  const userRes = await request(server)
    .post('/api/auth/register')
    .send(userObject);

  authToken = userRes.body.data.token;
  user = userRes.body.data.user;
  done();
});

afterAll(async done => {
  await db.destroy();
  done();
});

describe('Decks API endpoints', () => {
  describe('[GET] /api/decks/', () => {
    test('should return JSON object with a list of all decks', async done => {
      await request(server)
        .post('/api/decks')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      await request(server)
        .post('/api/decks')
        .set('Authorization', authToken)
        .send({ name: 'new-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .get('/api/decks')
        .set('Authorization', authToken);

      expect(response.status).toBe(200);
      expect(typeof response.body).toEqual('object');
      expect(response.body.data).toHaveLength(2);
      done();
    });
  });

  describe('[GET] /api/decks/:id', () => {
    test('should return JSON object with deck information', async done => {
      const { body } = await request(server)
        .post('/api/decks')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .get(`/api/decks/${body.deck.id}`)
        .set('Authorization', authToken);

      expect(response.body.deck.deck_name).toEqual('Test-deck');
      expect(response.body.deck.user_id).toEqual(user.id);
      done();
    });
  });

  describe('[POST] /api/decks/', () => {
    test('return unauthorized response if token is invalid', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .post(`/api/decks/${body.deck.id}`)
        .set('Authorization', 'my name is john');
      expect(response.status).toBe(401);
      done();
    });

    test('returns bad request when deck name is not provided', async done => {
      const response = await request(server)
        .post('/api/decks')
        .set('Authorization', authToken);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: '"name" is required' });
      done();
    });

    test('201 when a valid token and deck name are provided', async done => {
      const response = await request(server)
        .post('/api/decks')
        .set('Authorization', authToken)
        .send({ name: 'new-deck', tags: [1, 2, 3] });
      expect(response.status).toBe(201);
      expect(response.body.deck.user_id).toBe(user.id);
      expect(response.body.deck.name).toBe('new-deck');
      done();
    });
  });

  describe('[PUT] /api/decks/:id', () => {
    test('return unauthorized response if token not valid', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .post(`/api/decks/${body.deck.id}`)
        .set('Authorization', 'my name is john');
      expect(response.status).toBe(401);
      done();
    });

    test('returns bad request when deck name is not provided', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .put(`/api/decks/${body.deck.id}`)
        .set('Authorization', authToken);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: '"name" is required' });
      done();
    });

    test('update a deck when a valid token is provided', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .put(`/api/decks/${body.deck.id}`)
        .set('Authorization', authToken)
        .send({ name: 'updated-deck' });

      expect(response.status).toBe(200);
      expect(response.body.deck_name).toBe('updated-deck');
      done();
    });
  });

  describe('[DELETE] /api/decks/:id', () => {
    test('return bad request if no token ', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });
      const response = await request(server).delete(
        `/api/decks/${body.deck.id}`
      );
      expect(response.status).toBe(401);
      done();
    });

    test('delete a deck when a valid token is provided', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });

      const response = await request(server)
        .delete(`/api/decks/${body.deck.id}`)
        .set('Authorization', authToken);

      expect(response.status).toBe(204);

      // Check deck is deleted - should give Not Found response
      const responseDeleted = await request(server)
        .get(`/api/decks/${body.deck.id}`)
        .set('Authorization', authToken);

      expect(responseDeleted.status).toEqual(404);
      done();
    });
  });

  describe('[PUT] /api/decks/view/:id', () => {
    test('return 200 with correct id', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });
      const response = await request(server)
        .put(`/api/decks/view/${body.deck.id}`)
        .set('Authorization', authToken);
      expect(response.status).toBe(200);
      done();
    });
    test('return bad with no token', async done => {
      const { body } = await request(server)
        .post('/api/decks/')
        .set('Authorization', authToken)
        .send({ name: 'Test-deck', tags: [1, 2, 3] });
      const response = await request(server).put(
        `/api/decks/view/${body.deck.id}`
      );
      expect(response.status).toBe(401);
      done();
    });
  });
});
