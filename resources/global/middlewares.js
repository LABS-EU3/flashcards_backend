const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

exports.authorized = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ status: 401, error: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'Unauthenticated - please provide a valid token',
    });
  }
};