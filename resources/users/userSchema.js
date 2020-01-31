const joi = require('@hapi/joi');

const updateUserProfileSchema = joi.object({
  fullName: joi.string().required(),
});

module.exports = {
  updateUserProfileSchema,
};
