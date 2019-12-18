const request = require('supertest');

const server = require('../../api/server');

const model = require('./model');

const db = require('../../data/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

// Destroy knex instance after all tests are run to fix timeout in Travis build.
afterAll(async () => {
  await db.destroy();
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

    test('Token is returned on signup successful', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send(userObject);

      expect(res.status).toBe(201);

      expect(res.body.data.token).not.toBe(null || undefined);
    });

    test('Password is not stored in plain text', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const userCreated = await model.findBy({ email: userObject.email });

      expect(userCreated.email).toBe(userObject.email);
      expect(userCreated.password).not.toBe(userObject.password);
    });

    test('Email is required', async () => {
      const userCopy = { ...userObject };

      delete userCopy.email;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(400);
    });

    test('Password is required', async () => {
      const userCopy = { ...userObject };

      delete userCopy.password;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(400);
    });

    test('Full Name is required', async () => {
      const userCopy = { ...userObject };

      delete userCopy.fullName;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(400);
    });

    test('imageUrl and isConfirmed are not required', async () => {
      const userCopy = { ...userObject };

      delete userCopy.imageUrl;
      delete userCopy.isConfirmed;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(201);
    });

    test('Email cannot belong to multiple users', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/register')
        .send(userObject);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`User with this email already exists`);
    });
  });

  const loginUserObject = {
    email: 'h.kakashi@gmail.com',
    password: 'aVeryLongPassword',
  };

  describe('Login Endpoint', () => {
    test('Returns 200 OK on successful login', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/login')
        .send(loginUserObject);
      expect(res.status).toBe(200);
    });

    test('Token is returned on successful login', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/login')
        .send(loginUserObject);

      expect(res.status).toBe(200);
      expect(res.body.data.token).not.toBe(null || undefined);
    });

    test('Provided Email does not exist', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'aVeryLongPassword' });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe(`User with this email does not exists`);
    });

    test('Provided password is invalid', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'h.kakashi@gmail.com',
          password: 'testPasswordNotCorrect',
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('Email is required', async () => {
      const userCopy = { ...userObject };

      delete userCopy.email;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(400);
    });

    test('Password is required', async () => {
      const userCopy = { ...loginUserObject };

      delete userCopy.password;

      const res = await request(server)
        .post('/api/auth/register')
        .send(userCopy);

      expect(res.status).toBe(400);
    });
  });
});
