const joi = require('@hapi/joi');

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
  } catch (error) {
    res.status(400).json({ error: true, message: error.message, data: error });
  }
};
