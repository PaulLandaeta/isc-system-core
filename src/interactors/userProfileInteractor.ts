import * as UserProfileService from '../services/userProfileService';
import * as UserRoleService from '../services/userRoleService';
import * as ProfessorService from '../services/professorService';
import * as StudentService from '../services/studentService';
import { NotFoundError } from '../errors/notFoundError';
import db from '../repositories/pg-connection';

export const deleteUser = async (userId: string) => {
  try {
    const user = await UserProfileService.getUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (user.role_id === 1) {
      const error = new Error("You cannot delete users with the 'admin' role. This role is protected.");
      (error as any).statusCode = 403;
      throw error;
    }
    if (user.role_id === 2) {
      await db('graduation_process')
        .where({ tutor_id: userId })
        .update({ tutor_id: null });
    
      await db('graduation_process')
        .where({ reviewer_id: userId })
        .update({ reviewer_id: null });
    
      await db('professors').where({ id: userId }).delete();
    }
    if (user.role_id === 3) {
      await db('graduation_process')
        .where({ student_id: userId }).delete();
      
      await db('students').where({ id: userId }).delete();
    }
    await UserProfileService.deleteUser(parseInt(userId));
    await UserRoleService.deleteUserRole(userId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error((error as Error).message);
  }
};

export const getAllUsers = async () => {
  try {
    return await UserProfileService.getAllUsers();
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error((error as Error).message);
  }
};

export const getUser = async (userId: string) => {
  try {
    return await UserProfileService.getUser(userId);
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error((error as Error).message);
  }
};

export const createUser = async (userData: any) => {
  try {
    const newUser = await UserProfileService.createUserProfile(userData);
    if (!newUser) {
      throw new Error('Error creating user');
    }
    const { id } = newUser;
    const { isStudent } = userData;
    const combinedData = { ...userData, id };

    if (isStudent) {
      await StudentService.createStudent(combinedData);
    } else {
      await ProfessorService.createProfessorService(combinedData);
    }

    return newUser;
  } catch (error) {
    console.error('Error in create user interactor:', error);
    throw new Error('Error creating user');
  }
};

export const updateUser = async (userId: string, userProfileData: any) => {
  try {
    const updatedUserProfile = await UserProfileService.updateUserProfile(userId, userProfileData);
    if (userProfileData.isStudent) {
      await StudentService.handleStudentUpdate(userId, userProfileData);
    } else {
      await ProfessorService.handleProfessorUpdate(userId, userProfileData);
    }
    await UserProfileService.updateUserRoles(userId, userProfileData.roles);
    return updatedUserProfile;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error((error as Error).message);
  }
};
