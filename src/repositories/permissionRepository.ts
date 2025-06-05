import PermissionCategoryResponse from '../models/permissionCategoryResponseInterface';
import Permission from '../models/permissionInterface';
import PermissionCategory from '../models/PermissionCategoryInterface';
import db from './pg-connection';


const userProfileTable = 'user_profile';
const userRolesTable = 'user_roles';
const tablePermissions = 'permissions'
const permissionCategoryTable = 'permission_categories';
const rolePermissionsActionTable = 'role_permissions_action';

interface QueryResult {
  name: string;
}

export const getRoleAndPermissions = async (id: number) => {
  try {
    const profileRolesAndPermissions = await db(userProfileTable)
      .select(
        'roles.name as role_name',
        'roles.id as role_id',
        'permissions.id as permission_id',
        'permissions.name as permission_name',
        'permissions.description as permission_description',
        'permissions.display_name as permission_display_name',
        'permissions.path as permission_path',
        'permissions.sort as permission_sort',
        'roles.disabled as role_disabled',
        'permissions.disabled as permission_disabled'
      )
      .leftJoin('roles', 'user_profile.role_id', 'roles.id')
      .leftJoin('role_permissions', 'roles.id', 'role_permissions.role_id')
      .leftJoin('permissions', 'role_permissions.permission_id', 'permissions.id')
      .where('user_profile.id', id)
      .andWhere('roles.disabled', false);

    const userRolesAndPermissions = await db(userRolesTable)
      .select(
        'roles.name as role_name',
        'roles.id as role_id',
        'permissions.id as permission_id',
        'permissions.name as permission_name',
        'permissions.description as permission_description',
        'permissions.display_name as permission_display_name',
        'permissions.path as permission_path',
        'permissions.sort as permission_sort',
        'roles.disabled as role_disabled',
        'permissions.disabled as permission_disabled'
      )
      .leftJoin('roles', 'user_roles.role_id', 'roles.id')
      .leftJoin('role_permissions', 'roles.id', 'role_permissions.role_id')
      .leftJoin('permissions', 'role_permissions.permission_id', 'permissions.id')
      .where('user_roles.user_id', id)
      .andWhere('roles.disabled', false);

    const combinedRolesAndPermissionsRaw = [
      ...profileRolesAndPermissions,
      ...userRolesAndPermissions,
    ];

    const rolesAndPermissions = combinedRolesAndPermissionsRaw.reduce((acc, row) => {
      const {
        role_name,
        role_id,
        permission_id,
        permission_name,
        permission_description,
        permission_display_name,
        permission_path,
        permission_sort,
        permission_disabled,
      } = row;

      if (!acc[role_id]) {
        acc[role_id] = {
          role_name: role_name,
          permissions: [],
        };
      }
      if (permission_id && !permission_disabled) {
        acc[role_id].permissions.push({
          permission_id: permission_id,
          name: permission_name,
          description: permission_description,
          display_name: permission_display_name,
          path: permission_path,
          sort: permission_sort,
        });
      }

      return acc;
    }, {});

    return rolesAndPermissions;
  } catch (error) {
    console.error('Error in GenericRoleRepository.getRoleAndPermissions:', error);
    throw new Error('Error fetching Roles and Permissions');
  }
};

export const getPermissions = async () => {
  try {
    const permissions = await db
      .select(`${tablePermissions}.*`, `${permissionCategoryTable}.name as category_name`)
      .from(tablePermissions)
      .innerJoin(permissionCategoryTable, `${tablePermissions}.category_id`, `${permissionCategoryTable}.id`)
      .orderBy(`${permissionCategoryTable}.name`, 'asc');

    const categorizedPermissions: PermissionCategoryResponse = {};
    permissions.forEach((permission: PermissionCategory) => {
      if (!categorizedPermissions[permission.category_name]) {
        categorizedPermissions[permission.category_name] = [];
      }
      categorizedPermissions[permission.category_name].push(permission);
    });

    return categorizedPermissions;
  } catch (error) {
    console.error('Error in GenericRoleRepository.getPermissions:', error);
    throw new Error('Error fetching Permissions');
  }
};

export const getActionPermissions = async (userId: number): Promise<Permission[]> => {
  try {
    const actionPermissions = await db
      .select(
        `${tablePermissions}.name`,
        `${tablePermissions}.id`
      )
      .from(userRolesTable)
      .innerJoin(rolePermissionsActionTable, `${userRolesTable}.role_id`, `${rolePermissionsActionTable}.role_id`)
      .innerJoin(tablePermissions, `${rolePermissionsActionTable}.permission_id`, `${tablePermissions}.id`)
      .where(`${userRolesTable}.user_id`, userId);

    const permissions: Permission[] = actionPermissions.map((permission: { name: string; id: number }) => ({
      name: permission.name,
      id: permission.id,
    }));

    return permissions;
  } catch (error) {
    console.error('Error fetching action permissions:', error);
    throw error;
  }
};

export const getPermissionByID = async (id: number) => {
  try {
    const permission = db(tablePermissions).where('id', id).returning('*');
    return permission;
  } catch (error) {
    console.error('Error in GenericRoleRepository.getPermissionByID:', error);
    throw new Error('Error fetching Permission');
  }
};

export const getMenuItemsByRoleId = async (roleId: number) => {
  try {
    const permissions = await db('role_permissions as rp')
      .join('permissions as p', 'p.id', 'rp.permission_id')
      .where('rp.role_id', roleId)
      .select('p.display_name as name', 'p.path', 'rp.menu_order')
      .orderBy('rp.menu_order', 'asc');
    return permissions;
  } catch (error) {
    console.error('Error fetching menu items by role ID:', error);
    throw new Error('Error fetching menu items');
  }
};
