const joi = require('@hapi/joi');

const createCardSchema = joi.object({
  deckId: joi
    .number()
    .integer()
    .label('Deck Id')
    .required(),
  userId: joi
    .number()
    .integer()
    .label('User Id')
    .required(),
  questionText: joi
    .string()
    .label('Question Text')
    .required(),
  answerText: joi
    .string()
    .label('Answer Text')
    .required(),
  imageUrl: joi
    .string()
    .allow('')
    .label('Image URL'),
});

const editCardSchema = joi.object({
  deckId: joi
    .number()
    .integer()
    .label('Deck Id'),
  questionText: joi
    .string()
    .allow('')
    .label('Question Text'),
  answerText: joi
    .string()
    .allow('')
    .label('Answer Text'),
  imageUrl: joi
    .string()
    .allow('')
    .label('Image URL'),
});

module.exports = {
  createCardSchema,
  editCardSchema,
};
