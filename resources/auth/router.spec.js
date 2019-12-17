const request = require('supertest');

const server = require('../../api/server');

const model = require('./model');

const db = require('../../data/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

const userObject = {
  email: 'h.kakashi@gmail.com',
  password: 'aVeryLongPassword',
  fullName: 'Hatake Kakashi',
  imageUrl: 'google.com',
  isConfirmed: false,
};

describe('Auth Router', () => {
  describe('Register Endpoint', () => {
    test('Returns 200 on success', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject)
        .expect(201);
    });

    test('Returns created user without their password', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send(userObject);

      expect(res.status).toBe(201);

      expect(res.body.data.user).toMatchObject({
        email: userObject.email,
        image_url: userObject.imageUrl,
        full_name: userObject.fullName,
        isConfirmed: false,
      });
    });

    test('Password is not stored in plain text', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const userCreated = await model.findBy({ email: userObject.email });

      expect(userCreated.email).toBe(userObject.email);
      expect(userCreated.password).not.toBe(userObject.password);
    });
  });
});
