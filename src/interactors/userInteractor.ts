import * as UserService from '../services/userService';
import * as UserRoleService from '../services/userRoleService';
import { NotFoundError } from "../errors/notFoundError";

export const deleteUser = async (userId: number) => {
  try {
    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await UserService.deleteUser(userId);
    await UserRoleService.deleteUserRole(userId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error((error as Error).message);
  }
};
