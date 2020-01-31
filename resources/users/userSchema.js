const joi = require('@hapi/joi');

const updateUserProfileSchema = joi.object({
  fullName: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

module.exports = {
  updateUserProfileSchema,
};
