const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');

module.exports = token => {
  if (token) {
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
};
