import { Request, Response } from 'express';

import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';
import * as RolesInteractor from '../interactors/rolesInteractor';
import Rol from '../models/rol';
import rolePermissionsRequest from '../models/rolePermissionRequestInterface';

import * as RolesService from '../services/rolesService';

import { BadRequestError } from '../errors/badRequestError';

const isValidRoleData = (req: Request) => {
  const regex = /^[a-zA-Z]{4,16}$/
  const {name, category} = req.body
  return regex.test(name) && regex.test(category)
}
const regexRoleID = /^[0-9]+$/


export const getRoles = async (req: Request, res: Response) => {
  const rolName = req.body.name;
  try {
    const roles = await RolesInteractor.getRoles(rolName);
    if (!roles) {
      return res.status(404).json({ success: false, message: 'role not found' });
    }
    sendSuccess(res, roles, 'Roles retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createRol = async (req: Request, res: Response) => {
  if (!isValidRoleData(req)) {
    handleError(res, new BadRequestError("Datos inválidos, no ingrese números ni caracteres especiales"))
    return
  }
  const newRol: Rol = req.body;
  try {
    const rol = await RolesInteractor.createRol(newRol);
    if (!rol) {
      return res.status(404).json({ success: false, message: 'can not create role' });
    }
    sendSuccess(res, rol, 'Role created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const editRol = async (req: Request, res: Response) => {
  const regexID = /^[0-9]{1,8}$/
  if (!regexID.test(req.params.id)) {
    handleError(res, new BadRequestError("El ID debe ser un número entero positivo"))
    return
  }
  if (!isValidRoleData(req)) {
    handleError(res, new BadRequestError("Datos inválidos, no ingrese números ni caracteres especiales"))
    return
  }
  const rolToEdit: Rol = req.body;
  const id: number = parseInt(req.params.id);
  try {
    const editedRol = await RolesInteractor.editRol(rolToEdit, id);
    if (!editedRol) {
      return res.status(404).json({ success: false, message: 'can not edit rol' });
    }
    sendSuccess(res, editedRol, 'Role edited successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const disableRol = async (req: Request, res: Response) => {
  if (!regexRoleID.test(req.params.id)) {
    handleError(res, new BadRequestError("El ID debe ser un número entero positivo"))
    return
  }
  
  const id: number = parseInt(req.params.id);
  try {
    const disabledRol = await RolesInteractor.disableRol(id);
    if (!disabledRol) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, disabledRol, 'Role deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const addPermission = async (req: Request, res: Response) => {
  const ides: rolePermissionsRequest[] = req.body;
  try {
    const rolePermission = await RolesInteractor.addPermission(ides);
    if (!rolePermission) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, rolePermission, 'permission attach successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const removePermission = async (req: Request, res: Response) => {
  const ides: rolePermissionsRequest = req.body;

  try {
    const { role_id } = ides;
    const roles = await RolesService.getRoles('');
    const targetRole = Object.values(roles).find(r => r.id === role_id);

    if (!targetRole || targetRole.disabled) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar el permiso porque el rol está deshabilitado o no existe.',
      });
    }
    const rolePermission = await RolesInteractor.removePermission(ides);

    if (!rolePermission) {
      return res.status(404).json({
        success: false,
        message: 'No se puede eliminar el permiso: la relación con el permiso no existe.',
      });
    }

    sendSuccess(res, rolePermission, 'Permiso eliminado correctamente');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getRolesStudent = async (req: Request, res: Response) => {
  try {
    const rolesStudent = await RolesInteractor.getRolesStudent();
    sendSuccess(res, rolesStudent, 'Roles student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getRolesProfessor = async (req: Request, res: Response) => {
  try {
    const rolesProfessor = await RolesInteractor.getRolesProfessor();
    sendSuccess(res, rolesProfessor, 'Roles professor retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

