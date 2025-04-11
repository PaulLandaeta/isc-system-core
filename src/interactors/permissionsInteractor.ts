import * as userService from '../services/permissionService';
import { NotFoundError } from '../errors/notFoundError';

export const getRolesAndPermissions = async (userId: string) => {
    try {
      const rolesAndPermissions = await userService.getUserRolesAndPermissions(userId);
  
      if (!rolesAndPermissions|| Object.keys(rolesAndPermissions).length === 0) {
        throw new NotFoundError('Permissions not found');
      }
      return rolesAndPermissions;
    } catch (error) {
      console.error('Error getting permissions:', error);
      throw new Error('Error getting permissions');
    }
  };