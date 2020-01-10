const joi = require('@hapi/joi');

const deckSchema = joi.object({
  name: joi
    .string()
    .label('name')
    .required(),
});

module.exports = {
  deckSchema,
};
