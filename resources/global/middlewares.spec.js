const supertest = require('supertest');
const server = require('../../api/server.js');

const request = supertest(server);

const token = 'qweqweqwewqewqewq';

describe('token doesnt exist gives an error', () => {
  it('with wrong token gives back an error', async () => {
    const response = await request
      .get('/api/decks')
      .set('Authorization', `${token}`);
    expect(response.status).toEqual(401);
  });
});
