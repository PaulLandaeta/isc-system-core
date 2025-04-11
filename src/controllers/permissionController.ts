import { Request, Response } from 'express';
import * as permissionInteractor from '../interactors/permissionsInteractor';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';

export const getUserRolesAndPermissions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rolesAndPermissions = await permissionInteractor.getRolesAndPermissions(id);
    sendSuccess(res, rolesAndPermissions, 'Roles and permissions retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};