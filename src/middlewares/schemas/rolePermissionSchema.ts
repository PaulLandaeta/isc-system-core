import Joi from 'joi';

const rolePermissionsSchema = Joi.object({
  role_id: Joi.number().required().messages({
    'any.required': 'role id is required to search by name.',
  }),
  permission_id: Joi.number().required().messages({
    'any.required': 'permission id is required to search by name.',
  }),
  menu_order: Joi.number().integer().optional().messages({
    'number.base': 'menu order must be a number.',
    'number.integer': 'menu order must be an integer.',
  }),
});

export default rolePermissionsSchema;
