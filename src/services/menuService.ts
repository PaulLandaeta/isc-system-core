import { MenuItem, MenuResponse } from '../types/menuTypes';
import { getUserById } from '../repositories/userRepository';
import { getMenuItemsByRoleId } from '../repositories/permissionRepository';

export const getMenuByRole = async (userId: number): Promise<MenuResponse> => {
  try {
    // Fetch the user and their role
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch menu items for the user's role
    const menu = await getMenuItemsByRoleId(user.role_id);

    return {
      role: user.role,
      menu,
    };
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};
