import Permission from "../models/permissionInterface";
import * as permissionRepository from "../repositories/permissionRepository";

export const getUserRolesAndPermissions = async (id: string):Promise<Permission | null> => {
  const rolesAndPermissions = await permissionRepository.getRoleAndPermissions(id);
  if (!rolesAndPermissions || Object.keys(rolesAndPermissions).length === 0) {
    return null; 
  }
  return rolesAndPermissions;
}