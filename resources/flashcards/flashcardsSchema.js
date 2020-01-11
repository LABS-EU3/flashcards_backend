const joi = require('@hapi/joi');

exports.flashCardSchema = joi.object({
  questionText: joi
    .string()
    .label('Question Text')
    .required(),
  answerText: joi
    .string()
    .label('Answer Text')
    .required(),
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
  imageUrl: joi
    .string()
    .allow('')
    .label('Image URL'),
});
