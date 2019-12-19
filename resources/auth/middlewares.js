const validateToken = require('../../utils/validateToken');
const { EMAIL_SECRET } = require('../../config');
const model = require('./model');

exports.checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await model.filter({ email });
  if (userExists) {
    res.status(400).json({ message: `User with this email already exists` });
  } else {
    next();
  }
};

exports.checkEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await model.filter({ email });
  if (!emailExists) {
    res.status(404).json({ message: 'User with this email does not exists' });
  } else {
    next();
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = validateToken(token, EMAIL_SECRET);

    const userId = decodedToken.subject;
    const response = await model.confirmEmail(userId);

    if (response) {
      req.userId = decodedToken.subject;
      req.userEmail = response.email;
      next();
    } else {
      res.status(400).json({ message: `Email confirmation failed!` });
    }
  } catch (error) {
    res.status(400).json({ message: `Confirmation failed: ${error.message}!` });
  }
};
