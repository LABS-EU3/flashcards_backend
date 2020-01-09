const request = require('supertest');
const iwm = require('nodemailer-stub').interactsWithMail;

const crypto = require('crypto');
const generateToken = require('../../utils/generateToken');
// const validateToken = require('../../utils/validateToken');
const server = require('../../api/server');

const model = require('./model');

const db = require('../../data/dbConfig');

beforeEach(async () => {
  await db.raw('TRUNCATE TABLE users, reset_password CASCADE');
});

// Destroy knex instance after all tests are run to fix timeout in Travis build.
afterAll(async () => {
  await db.destroy();
});

// const USER = {
//   full_name: 'testuser',
//   email: 'test@gmail.com',
//   password: 'test-pass',
// };

const userObject = {
  email: 'h.kakashi@gmail.com',
  password: 'aVeryLongPassword',
  fullName: 'Hatake Kakashi',
  imageUrl: 'google.com',
  isConfirmed: false,
};

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contents: ['foo'],
  contentType: 'text/plain',
};

describe('Auth Router', () => {
  describe('Register Endpoint', () => {
    test('Returns 201 on success', async () => {
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
        .post('/api/auth/login')
        .send(userCopy);

      expect(res.status).toBe(400);
    });

    test('Password is required', async () => {
      const userCopy = { ...loginUserObject };

      delete userCopy.password;

      const res = await request(server)
        .post('/api/auth/login')
        .send(userCopy);

      expect(res.status).toBe(400);
    });
  });

  describe('Email Confirmation', () => {
    test('Validation works', async () => {
      const userRes = await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const { user } = userRes.body.data;
      const token = await generateToken(user, 'emailSecret');
      // const validToken = await validateToken(token, 'emailSecret');
      // const res = await request(server)
      await request(server)
        .post('/api/auth/confirm_email')
        .send({ token })
        // .send({ validToken })
        .expect(200);

      // expect(res.status).toBe(200);
    });
  });

  describe('Forgot Password', () => {
    test('Get email sent to reset password if forgotten', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/forgot_password')
        .send({ email: 'h.kakashi@gmail.com' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Password reset link sent to your email');
    });

    test('Email is sent', async () => {
      iwm.newMail(exampleMail);

      const lastMail = iwm.lastMail();

      expect(lastMail).not.toBe(null || undefined);
    });

    test('Will not get an email sent if wrong email', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const res = await request(server)
        .post('/api/auth/forgot_password')
        .send({ email: 't.test@gmail.com' });

      expect(res.status).toBe(500);
    });
  });

  describe('Reset password', () => {
    test('Cannot reset password if not valid token', async () => {
      const res = await request(server)
        .post('/api/auth/reset_password/aaeu@ygdifgiert')
        .send({ password: 'test', confirmPassword: 'test' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`Invalid token or previously used token`);
    });
    test('User can reset password, testing if token is valid', async () => {
      const newUser = await request(server)
        .post('/api/auth/register')
        .send(userObject);

      const userResetToken = crypto.randomBytes(20).toString('hex');

      await model.insertResetToken({
        user_id: newUser.body.data.user.id,
        token: userResetToken,
        active: 1,
      });

      // Resetting the password here
      const res = await request(server)
        .post(`/api/auth/reset_password/${userResetToken}`)
        .send({ password: 'test', confirmPassword: 'test' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Password has been reset');

      // testing if the user can login with the new password
      const resLogin = await request(server)
        .post('/api/auth/login')
        .send({ email: 'h.kakashi@gmail.com', password: 'test' });

      expect(resLogin.status).toBe(200);
      expect(resLogin.body.message).toBe(`Welcome. You're logged in!`);
    });
  });

  describe('viewProfile Endpoint', () => {
    test('Returns 200 on success', async () => {
      // register the user
      await request(server)
        .post('/api/auth/register')
        .send(userObject);

      // log the user in
      const res = await request(server)
        .post('/api/auth/login')
        .send(loginUserObject);

      const { token } = res.body.data;
      expect(res.status).toBe(200);
      expect(token).not.toBe(null || undefined);

      // authorize token and get user profile
      await request(server)
        .get('/api/auth/view_profile')
        .set('Authorization', `${token}`)
        .expect(200);
    });
  });
});
