const supertest = require('supertest');
const server = require('../../api/server.js');
const generateToken = require('../../utils/generateToken');
const db = require('../../data/dbConfig.js');

const request = supertest(server);

let USER;
let DECK;
let validToken;

beforeAll(async () => {
  await db.raw('TRUNCATE TABLE users, decks CASCADE');
  USER = await db('users')
    .insert({
      full_name: 'John Mayai',
      email: 'test@example.com',
      password: 'passwordTest',
    })
    .returning('*');
  DECK = await db('decks')
    .insert({ name: 'my-deck', user_id: USER[0].id })
    .returning('*');

  validToken = generateToken(USER[0]);
  [DECK] = DECK;
});

afterAll(async () => {
  await db.destroy();
});

describe('Decks API endpoints', () => {
  describe('get all decks', () => {
    it('should return an OK response code ', async () => {
      const expectedStatusCode = 200;

      const response = await request
        .get('/api/decks')
        .set('Authorization', `${validToken}`);

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return JSON object with a list of all decks', async () => {
      const response = await request
        .get('/api/decks')
        .set('Authorization', `${validToken}`);
      expect(typeof response.body.data).toEqual('object');
      expect(response.body.data.length).toEqual(1);
    });
  });

  describe('get a single deck', () => {
    it('should return an OK response code ', async () => {
      const expectedStatusCode = 200;

      const response = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return JSON object with deck information', async () => {
      const response = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.body.data.name).toEqual('my-deck');
    });
  });

  describe('Add a deck', () => {
    it('should return bad request response if no token provided', async () => {
      const response = await request.post('/api/decks');

      // Bad request no token
      expect(response.status).toBe(400);
    });

    it('should return unauthorized response if token is invalid', async () => {
      const response = await request
        .post('/api/decks')
        .set('Authorization', 'my name is john');

      expect(response.status).toBe(401);
    });

    it('should add a deck when a valid token is provided', async () => {
      const response = await request
        .post('/api/decks')
        .set('Authorization', `${validToken}`)
        .send({ name: 'new-deck' });

      expect(response.status).toBe(201);
    });
  });

  describe('Update a deck', () => {
    it('should return bad request if no token ', async () => {
      const response = await request.put(`/api/decks/${DECK.id}`);

      // Bad request no token
      expect(response.status).toBe(400);
    });

    it('should return unauthorized response if token not valid', async () => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', 'my name is john');

      expect(response.status).toBe(401);
    });

    it('should update a deck when a valid token is provided', async () => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`)
        .send({ name: 'updated-deck' });

      expect(response.body.data.name).toBe('updated-deck');
      expect(response.status).toBe(200);
    });
  });

  describe('Delete a deck', () => {
    it('should return bad request if no token ', async () => {
      const response = await request.delete(`/api/decks/${DECK.id}`);

      expect(response.status).toBe(400);
    });

    it('should return unauthorized response if token is invalid', async () => {
      const response = await request
        .delete(`/api/decks/${DECK.id}`)
        .set('Authorization', 'invalid token');

      expect(response.status).toBe(401);
    });

    it('should delete a deck when a valid token is provided', async () => {
      const response = await request
        .delete(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.status).toBe(200);

      // Check deck is deleted
      const responseDeleted = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(responseDeleted.status).toEqual(200);
    });
  });
});
