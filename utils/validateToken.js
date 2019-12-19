const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

module.exports = (token, secret = SECRET) => {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
};
