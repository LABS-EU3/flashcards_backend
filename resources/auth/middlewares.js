const model = require('./model');

exports.checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await model.filter({ email });
  if (userExists) {
    res.status(403).json({ message: `User with this email already exists` });
  } else {
    next();
  }
};
