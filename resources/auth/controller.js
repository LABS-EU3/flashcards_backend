const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const model = require('./model');

const schema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  full_name: joi.string().required(),

  image_url: joi.string(),

  isConfirmed: joi.boolean(),
});

exports.signup = async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    const { email, full_name, image_url, password } = req.body;

    const userExists = await model.filter({ email });
    if (userExists) {
      res
        .status(400)
        .json({ error: true, message: `User with this email already exists` });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userCreated = model.createUser({
      email,
      password: hashedPassword,
      full_name,
      image_url,
      isConfirmed: false,
    });

    res.status(201).json({
      error: false,
      message: `User created successfully`,
      data: userCreated,
    });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message, data: error });
  }
};
