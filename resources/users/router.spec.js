const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');

const userObject = {
  email: 'h.kakashi@gmail.com',
  password: 'aVeryLongPassword',
  fullName: 'Hatake Kakashi',
  imageUrl: 'google.com',
  isConfirmed: false,
};

let user;
let authToken;

beforeEach(async done => {
  await db.raw('TRUNCATE TABLE users CASCADE');
  const userRes = await request(server)
    .post('/api/auth/register')
    .send(userObject);

  authToken = userRes.body.data.token;
  user = userRes.body.data.user;
  done();
});

// Destroy knex instance after all tests are run to fix timeout in Travis build.
afterAll(async done => {
  await db.destroy();
  done();
});

describe('Users route', () => {
  describe('Delete user endpoint', () => {
    test('Returns 200 on success', async done => {
      let res;
      res = await request(server)
        .delete(`/api/users/${user.id}`)
        .set('Authorization', authToken);

      expect(res.status).toBe(200);

      res = await request(server)
        .post('/api/auth/login')
        .send({
          email: userObject.email,
          password: userObject.pasword,
        });

      // deleted user no longer exists
      expect(res.status).toBe(400);

      done();
    });

    test('Returns 403 forbidden', async done => {
      const res = await request(server)
        .delete('/api/users/888')
        .set('Authorization', authToken);

      expect(res.status).toBe(403);

      done();
    });
  });
});