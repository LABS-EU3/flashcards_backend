const joi = require('@hapi/joi');

const signUpSchema = joi.object({
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

const loginSchema = joi.object({
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
});

const forgotPasswordSchema = joi.object({
  email: joi
    .string()
    .label('Email')
    .required(),
});

const resetPasswordSchema = joi.object({
  password: joi
    .string()
    .label('Password')
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  confirmPassword: joi
    .string()
    .required()
    .valid(joi.ref('password')),
});

const storeImgUrlSchema = joi.object({
  imageUrl: joi.string().required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  storeImgUrlSchema,
};
