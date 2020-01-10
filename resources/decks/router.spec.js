const supertest = require('supertest');
const server = require('../../api/server.js');
const generateToken = require('../../utils/generateToken');
const db = require('../../data/dbConfig.js');

const request = supertest(server);

let USER;
let DECK;

let validToken;

beforeEach(async done => {
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

  await db('deck_tags').insert({
    tag_id: 1,
    deck_id: DECK[0].id,
  });
  await db('deck_tags').insert({
    tag_id: 2,
    deck_id: DECK[0].id,
  });

  validToken = generateToken(USER[0]);
  [DECK] = DECK;
  done();
});

afterEach(async done => {
  await db.raw('TRUNCATE TABLE users CASCADE');
  done();
});

describe('Decks API endpoints', () => {
  describe('get all decks', () => {
    it('should return an OK response code ', async done => {
      const expectedStatusCode = 200;

      const response = await request
        .get('/api/decks')
        .set('Authorization', `${validToken}`);

      expect(response.status).toEqual(expectedStatusCode);
      done();
    });

    it('should return JSON object with a list of all decks', async done => {
      const response = await request
        .get('/api/decks')
        .set('Authorization', `${validToken}`);
      expect(typeof response.body.data).toEqual('object');
      expect(response.body.data.length).toEqual(1);
      done();
    });
  });

  describe('get a single deck', () => {
    it('should return an OK response code ', async done => {
      const expectedStatusCode = 200;

      const response = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.status).toEqual(expectedStatusCode);
      done();
    });

    it('should return JSON object with deck information', async done => {
      const response = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.body.data[0].deck_name).toEqual('my-deck');
      done();
    });
  });

  describe('Add a deck', () => {
    it('return bad request response if no token provided', async done => {
      const response = await request.post('/api/decks');

      // Bad request no token
      expect(response.status).toBe(400);
      done();
    });

    it('return unauthorized response if token is invalid', async done => {
      const response = await request
        .post('/api/decks')
        .set('Authorization', 'my name is john');

      expect(response.status).toBe(401);
      done();
    });

    it('should add a deck when a valid token is provided', async done => {
      const response = await request
        .post('/api/decks')
        .set('Authorization', `${validToken}`)
        .send({
          name: 'new-deck',
          tagsArray: ['Physiotherapy', 'Veterinary Medicine', 'Youth Work'],
        });

      expect(response.status).toBe(201);
      done();
    });
  });

  describe('Update a deck', () => {
    it('should return bad request if no token ', async done => {
      const response = await request.put(`/api/decks/${DECK.id}`);

      // Bad request no token
      expect(response.status).toBe(400);
      done();
    });

    it('should return unauthorized response if token not valid', async done => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', 'my name is john');

      expect(response.status).toBe(401);
      done();
    });

    it('should update a deck when a valid token is provided', async done => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`)
        .send({ name: 'updated-deck' });

      expect(response.body.data[0].deck_name).toBe('updated-deck');
      expect(response.status).toBe(200);
      done();
    });

    it('should update a deck with removing and adding an array', async done => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`)
        .send({
          name: 'updated-deck2',
          removeTagsArray: ['Accounting & Finance'],
          addTagsArray: ['Computer Science', 'Counselling', 'Creative Writing'],
        });
      expect(response.body.data[0].tags.length).toBe(4);
      expect(response.status).toBe(200);
      done();
    });

    it(' error when trying to enter a tag that doesnt exists', async done => {
      const response = await request
        .put(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`)
        .send({
          name: 'updated-deck23',
          addTagsArray: ['Test'],
        });
      expect(response.status).toBe(500);
      done();
    });
  });

  describe('Delete a deck', () => {
    it('should return bad request if no token ', async done => {
      const response = await request.delete(`/api/decks/${DECK.id}`);

      expect(response.status).toBe(400);
      done();
    });

    it('return unauthorized response if token is invalid', async done => {
      const response = await request
        .delete(`/api/decks/${DECK.id}`)
        .set('Authorization', 'invalid token');

      expect(response.status).toBe(401);
      done();
    });

    it('should delete a deck when a valid token is provided', async done => {
      const response = await request
        .delete(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(response.status).toBe(200);

      // Check deck is deleted
      const responseDeleted = await request
        .get(`/api/decks/${DECK.id}`)
        .set('Authorization', `${validToken}`);

      expect(responseDeleted.status).toEqual(200);
      done();
    });
  });
});
