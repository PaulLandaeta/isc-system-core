import UserResponse from '../models/genericUserResponse';
import { userProfileInterface } from '../models/userProfile';
import { buildLogger } from '../plugin/logger';
import { StudentProfileResponseDTO } from '../dtos/studentProfileResponse';


import db from './pg-connection';

const logger = buildLogger('userProfileRepository');

const TABLE_NAME = 'user_profile';

export const createUserProfile = async (userProfile: userProfileInterface) => {
  try {
    const [newUserProfile] = await db(TABLE_NAME).insert(userProfile).returning('*');
    return newUserProfile;
  } catch (error) {
    const err = error as Error;
    logger.error(`Error creating user profile: ${err.message}`, { err, userProfile });
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await db(TABLE_NAME).where('id', userId).delete();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const user = await db(TABLE_NAME).where('id', userId).first();
    return user;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<UserResponse[] | null> => {
  try {
    const users = await db(TABLE_NAME as 'user');
    return users;
  } catch (error) {
    console.log('Error getting all users', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, userProfileData: any) => {
  try {
    const updatedProfile = await db(TABLE_NAME)
      .where('id', userId)
      .update(userProfileData)
      .returning('*');
    return updatedProfile;
  } catch (error) {
    console.log('Error updating user profile:', error);
    throw error;
  }
};

export const updateUserProfileRole = async (userId: string, roleId: number) => {
  try {
    await db(TABLE_NAME).where('id', userId).update({ role_id: roleId });
  } catch (error) {
    console.log('Error updating user profile role:', error);
    throw error;
  }
};


export const getUserProfilePublicById = async (userId: string): Promise<StudentProfileResponseDTO | null> => {
  try {
    const row = await db(`${TABLE_NAME} as up`)
      .leftJoin('roles as r', 'r.id', 'up.role_id')
      .select(
        'up.id',
        'up.name',
        db.raw(`'' as career`),   
        'up.phone',
        'up.email',
        db.raw(`COALESCE(r.name, 'unknown') as role`)
      )
      .where('up.id', userId)
      .first();

    if (!row) return null;

    return {
      id: String(row.id),
      name: row.name,
      career: row.career,
      phone: row.phone,
      email: row.email,
      role: row.role,
    };
  } catch (error) {
    console.error('Error fetching public user profile by id:', error);
    throw error;
  }
};