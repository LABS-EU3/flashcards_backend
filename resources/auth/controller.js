const bcrypt = require('bcrypt');
const crypto = require('crypto');

const model = require('./model');
const generateToken = require('../../utils/generateToken');
const { welcomeText } = require('../../utils/constants');
const { EMAIL_SECRET } = require('../../config');
const emailTemplate = require('../../templates/confirmEmail');
const resetPasswordTemplate = require('../../templates/forgotPassword');
const sendEmail = require('../../utils/sendEmail');

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

    const emailToken = generateToken(userCreated, EMAIL_SECRET);

    sendEmail(welcomeText, email, emailTemplate(fullName, emailToken));

    res.status(201).json({
      message: `User created successfully`,
      data: {
        token,
        user: userCreated,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to sign user up` });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      user,
      body: { password },
    } = req;

    /* 1st is user submitted password. 2nd is hashed stored password */
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      delete user.password;
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome. You're logged in!`,
        data: { token, user },
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to log user in` });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const passwordResetToken = crypto.randomBytes(20).toString('hex');
    const resetRequestEmail = req.body.email;
    const user = await model.filter({ email: resetRequestEmail });

    await model.insertResetToken({
      user_id: user.id,
      token: passwordResetToken,
      active: 1,
    });

    sendEmail(
      'Forgot Password - QuickDecks',
      resetRequestEmail,
      resetPasswordTemplate(resetRequestEmail, passwordResetToken)
    );
    res.status(200).json({ message: `Password reset link sent to your email` });
  } catch (error) {
    res.status(500).json({ message: `Failed to send reset link` });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req;
    const newPassword = bcrypt.hashSync(req.body.password, 10);
    const userId = token.user_id;
    await model.changePassword(userId, newPassword);
    await model.revokeResetToken(token);

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: `Failed to reset password` });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const user = await model.filter({ id: req.userId });

    const signInToken = generateToken(user);
    res.status(200).json({
      message: `User with email: ${req.userEmail} confirmed.`,
      token: signInToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to confirm user email` });
  }
};

exports.viewProfile = async (req, res) => {
  try {
    const { subject } = req.decodedToken;
    const user = await model.filter({ id: subject });
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: `Error loading profile ${error.message}` });
  }
};
