import Joi from 'joi';

export const roleNameScheme = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
  }),
});

