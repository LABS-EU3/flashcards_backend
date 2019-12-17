const bcrypt = require('bcrypt');

const model = require('./model');
const generateToken = require('../../utils/generateToken');

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

    res.status(201).json({
      message: `User created successfully`,
      data: { token, user: userCreated },
    });
  } catch (error) {
    res.status(400).json({ message: error.message, data: error });
  }
};
