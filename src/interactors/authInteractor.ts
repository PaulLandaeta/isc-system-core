import * as authService from '../services/authFuncService'

export const getUserPermissionsAndMenu = async (userId: number) => {
  try {
    const permissions = await authService.getUserPermissionsAndMenu(userId);
    return permissions
  } catch (error) {
    console.error('Error getting permissions and menu by user id:', error);
    throw error;
  }
}