import Joi from 'joi';

const rolePermissionsSchema = Joi.object({
  role_id: Joi.number().required().messages({
    'any.required': 'role id is required to search by name.',
  }),
  permission_id: Joi.number().required().messages({
    'any.required': 'permission id is required to search by name.',
  }),
  type: Joi.string().valid('page', 'action').required().messages({
    'any.only': 'type must be either "page" or "action".',
    'any.required': 'type is required.',
  }),
  menu_order: Joi.when('type', {
    is: 'page',
    then: Joi.number().integer().required().messages({
      'any.required': 'menu order is required when type is "page".',
      'number.base': 'menu order must be a number.',
      'number.integer': 'menu order must be an integer.',
    }),
    otherwise: Joi.forbidden() 
  }),

});

export default rolePermissionsSchema;
