import { UserPermissionsAndMenu } from 'src/models/userPermissionMenuInterface';
import * as permissionRepository from '../repositories/permissionRepository';

export const getUserPermissionsAndMenu = async (id: number): Promise<UserPermissionsAndMenu> => {
    const permissions = await permissionRepository.getUserPermissionsAndMenu(id);
    return permissions
}