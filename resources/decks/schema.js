const joi = require('@hapi/joi');

const deckSchema = joi.object({
  name: joi
    .string()
    .label('name')
    .required(),
  removeTags: joi.array().items(joi.string()),
  addTags: joi.array().items(joi.string()),
  tags: joi.array().items(joi.string()),
});

module.exports = {
  deckSchema,
};
