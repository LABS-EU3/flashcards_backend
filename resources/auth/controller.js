const bcrypt = require('bcrypt');
const crypto = require('crypto');

const model = require('./model');
const generateToken = require('../../utils/generateToken');

exports.signup = async (req, res) => {
  try {
    const { email, fullName, imageUrl, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userCreated = await model.createUser({
      email,
      password: hashedPassword,
      full_name: fullName,
      image_url: imageUrl,
      isConfirmed: false,
    });

    const token = generateToken(userCreated);

    res.status(201).json({
      message: `User created successfully`,
      data: { token, user: userCreated },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.findBy({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      /* 1st is user submitted password. 2nd is hashed stored password */

      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome. You're logged in!`,
        data: { token, user },
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: error });
  }
};

exports.requestResetToken = async (req, res) => {
  try {
    const passwordResetToken = crypto.randomBytes(20).toString('hex');
    const resetRequestEmail = req.body.email;
    const user = await model.filter({ email: resetRequestEmail });

    await model.InsertResetToken({
      user_id: user.id,
      token: passwordResetToken,
      active: 1,
    });

    // Insert sending email code here
    res.status(200).json({ message: `Password reset link sent to your email` });
  } catch (error) {
    res.status(500).json({ message: error.message, data: error });
  }
};

exports.checkResetToken = async (req, res) => {
  try {
    const token = req.param('token', 0);

    const checkToken = await model.filterForToken({ token });
    // Returns an array (0 if not found, 1 if found)

    if (checkToken.length === 0) {
      res
        .status(403)
        .json({ message: 'Invalid token or previously used token' });
    } else {
      const password = bcrypt.hashSync(req.body.password, 10);
      const userId = checkToken[0].user_id;

      await model.changePassword(userId, password);
      await model.revokeResetToken(token);
      res.status(200).json({ message: 'Password has been reset' });

      // Change password here
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: error });
  }
};
