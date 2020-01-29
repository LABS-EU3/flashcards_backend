const joi = require('@hapi/joi');

const userFeedbackSchema = joi.object({
  text: joi
    .string()
    .min(5)
    .max(200),
});

module.exports = {
  userFeedbackSchema,
};
