const bcrypt = require('bcrypt');

const model = require('./model');
const generateToken = require('../../utils/generateToken');
const validateToken = require('../../utils/validateToken');
const { welcomeText } = require('../../utils/constants');
const { EMAIL_SECRET } = require('../../config');
const emailTemplate = require('../../templates/confirmEmail');
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

exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = validateToken(token, EMAIL_SECRET);

    const userId = decodedToken.subject;
    const response = await model.confirmEmail(userId);

    if (response) {
      const user = model.filter({ id: userId });

      const signInToken = generateToken(user);
      res.status(200).json({
        message: `User with email: ${response.email} confirmed.`,
        token: signInToken,
      });
    } else {
      res.status(400).json({ message: `Email confirmation failed!` });
    }
  } catch (error) {
    res.status(400).json({ message: `Confirmation failed: ${error.message}!` });
  }
};
