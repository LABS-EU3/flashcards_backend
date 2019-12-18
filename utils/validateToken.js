const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');

module.exports = token => {
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return undefined;
    }
    return decodedToken;
  });
};
