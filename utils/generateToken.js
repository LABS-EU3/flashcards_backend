const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');

const generateToken = user => {
  const payload = {
    subject: user.id,
    name: user.full_name,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, SECRET, options);
};

module.exports = generateToken;
