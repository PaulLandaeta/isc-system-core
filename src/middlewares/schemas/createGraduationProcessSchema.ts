import Joi from 'joi';

const createGraduationProcessSchema = Joi.object({
  student_code: Joi.number().integer().required().messages({
    'number.base': 'Student code must be an integer',
    'any.required': 'Student code is required',
  }),
  modality_id: Joi.number().integer().required().messages({
    'number.base': 'Modality ID must be an integer',
    'any.required': 'Modality ID is required',
  }),
  project_name: Joi.string().required().messages({
    'any.required': 'Project name is required',
  }),
  period: Joi.string()
    .trim()
    .pattern(/^(Primero|Segundo)[-\s]?\d{4}$/)
    .required()
    .messages({
      'any.required': 'Period is required',
      'string.empty': 'Period is required and cannot be empty',
      'string.pattern.base':
        'Invalid period format. Use PrimeroYYYY or SegundoYYYY (e.g., Primero2025, Segundo2025).',
    }),
  stage_id: Joi.number().integer().required().messages({
    'number.base': 'Stage ID must be an integer',
    'any.required': 'Stage ID is required',
  }),
});

export { createGraduationProcessSchema };
