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
  // cards: joi
  //   .array()
  //   .items(joi.number().integer())
  //   .label('Card Ids')
  //   .required(),
  // scores: joi
  //   .array()
  //   .items(joi.number().integer())
  //   .label('Scores')
  //   .required(),
  // deckId: joi
  //   .number()
  //   .integer()
  //   .label('Deck Id')
  //   .required(),

  // a: joi.string().required(),

  scores: joi
    .array()
    .items(
      joi.object({
        card_id: joi
          .number()
          .integer()
          .required(),

        deck_id: joi
          .number()
          .integer()
          .required(),

        rating: joi
          .number()
          .integer()
          .required(),

        user_id: joi
          .number()
          .integer()
          .required(),
      })
    )
    // .required()
    .label('Array of scores'),
});
