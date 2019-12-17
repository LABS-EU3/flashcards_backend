const model = require('./model');

module.checkUserExists = email => async (req, res, next) => {
  const userExists = await model.filter({ email });
  if (userExists) {
    res.status(400).json({ message: `User with this email already exists` });
  } else {
    next();
  }
};
