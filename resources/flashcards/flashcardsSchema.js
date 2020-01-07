const joi = require('@hapi/joi');

const createCardSchema = joi.object({
  email: joi
    .string()
    .label('Email')
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: joi
    .string()
    .label('Password')
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  fullName: joi
    .string()
    .label('Full Name')
    .required(),
  imageUrl: joi
    .string()
    .allow('')
    .label('Image URL'),
  isConfirmed: joi.boolean().label('isConfirmed'),
});

module.exports = {
  createCardSchema,
};
