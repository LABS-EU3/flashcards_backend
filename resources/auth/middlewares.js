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
