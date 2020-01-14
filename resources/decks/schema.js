const joi = require('@hapi/joi');

const deckSchema = joi.object({
  name: joi
    .string()
    .label('name')
    .required(),
  removeTags: joi.array().items(joi.number().integer()),
  addTags: joi.array().items(joi.number().integer()),
  tags: joi.array().items(joi.number().integer()),
});

module.exports = {
  deckSchema,
};
