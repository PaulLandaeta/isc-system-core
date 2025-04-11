import db from "./pg-connection";
const tableName = 'users';

export const getRoleAndPermissions = async (id: string) => {
  try {
    const rolesAndPermissionsRaw = await db(tableName)
      .select('roles.name as role_name', 'permissions.name as permission_name')
      .innerJoin('user_roles', 'users.id', 'user_roles.user_id')
      .innerJoin('roles', 'user_roles.role_id', 'roles.id')
      .innerJoin('role_permissions', 'roles.id', 'role_permissions.role_id')
      .innerJoin('permissions', 'role_permissions.permission_id', 'permissions.id')
      .where('users.id', id);
    const rolesAndPermissions = rolesAndPermissionsRaw.reduce((acc, row) => {
      const { role_name, permission_name } = row;
      if (!acc[role_name]) {
        acc[role_name] = [];
      }
      acc[role_name].push(permission_name);
      return acc;
    }, {});
    return rolesAndPermissions;
  } catch (error) {
    console.error('Error in GenericRoleRepository.getRoleAndPermissions:', error);
    throw new Error('Error fetching Roles and Permissions');
  }
}