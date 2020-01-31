const joi = require('@hapi/joi');

const deleteAccountSchema = joi.object({
  password: joi
    .string()
    .label('Password')
    .required(),
});

module.exports = { deleteAccountSchema };
