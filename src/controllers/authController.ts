import { Request, Response } from 'express';

import * as LoginInteractor from '../interactors/loginInteractor';
import * as PermissionsInteractor from '../interactors/permissionsInteractor';
import * as AuthInteractor from '../interactors/authInteractor';
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';
import { AuthenticationError } from '../errors/authenticationError';
import UserResponse from '../models/userResponseInterface';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const resLogin: string | UserResponse = await LoginInteractor.login(email, password);
    if (typeof resLogin === 'string') {
      throw new AuthenticationError(resLogin);
    }
    // TODO: use when all permissions are set
    const roles_permissions = await PermissionsInteractor.getRolesAndPermissions(resLogin.id);
    const result = {
      ...resLogin,
      roles_permissions,
    };
    sendSuccess(res, result, 'Successfully logged in');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const mePermissions = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const permissions = await AuthInteractor.getUserPermissionsAndMenu(id);
    sendSuccess(res, permissions, 'Permissions and Menu retrieved successfully')
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
}
