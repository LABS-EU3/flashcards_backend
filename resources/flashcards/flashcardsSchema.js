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
  imageUrlQuestion: joi
    .string()
    .allow('')
    .label('Image URL Question'),
  imageUrlAnswer: joi
    .string()
    .allow('')
    .label('Image URL Answer'),
});

exports.ratingsSchema = joi.object({
  cards: joi
    .array()
    .items(joi.number().integer())
    .label('Card Ids')
    .required(),
  scores: joi
    .array()
    .items(joi.number().integer())
    .label('Scores')
    .required(),
  deckId: joi
    .number()
    .integer()
    .label('Deck Id')
    .required(),
});
