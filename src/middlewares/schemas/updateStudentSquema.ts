import Joi from 'joi';

export const studentSquema = Joi.object({

  username: Joi.string().required().messages({
    'any.required': 'Username is required.',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'Lastname is required.',
  }),
  mothername: Joi.string().required().messages({
    'any.required': 'Mothername is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Phone is required.',
  }),
  code: Joi.string().required().messages({
    'any.required': 'Code is required.',
  }),
});
