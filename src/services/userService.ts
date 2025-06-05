import User from '../models/userInterface';
import * as UserRepository from '../repositories/userRepository';
import { buildLogger } from '../plugin/logger';
import config from '../config/config';
import createUserRequest from '../dtos/createUserRequest';
import roles from '../constants/roles';
import { ConflictError } from '../errors/conflictError';

import * as AuthenticationService from './authenticationService';

const logger = buildLogger('userService');
const { defaultUserPassword } = config;

export const findByEmail = async (email: string): Promise<User> => {
  return UserRepository.getUserByEmail(email);
};

export const createUser = async (user: createUserRequest) => {
  try {
    const existingUser = await UserRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const existingUserWithCode = await UserRepository.getUserByCode(user.code);
    if (existingUserWithCode) {
      throw new ConflictError('User with this code already exists');
    }

    logger.debug('Attempting to create a new User');
    const hashedPassword = await AuthenticationService.hashPassword(defaultUserPassword);
    return await UserRepository.createUser({
      ...user,
      password: hashedPassword,
      username: user.code + user.lastname,
      role_id: user.role_id ? user.role_id : roles.STUDENT.id,
    });
  } catch (error) {
    console.error('Error in userService.createUser: Error creating User');
    throw error;
  }
};

export const getProfessors = async () => {
  try {
    logger.debug('Attempting to fetch professors');
    const professors = await UserRepository.getProfessors();
    logger.info('Professors fetched successfully.');
    return professors;
  } catch (error) {
    logger.error(`Error fetching professors: ${error}`);
    throw new Error('Error occurred while fetching professors');
  }
};

export const getUserByRol = async (rolId: number) => {
  try {
    return UserRepository.getUserByRol(rolId);
  } catch (error) {
    logger.error(`Error fetching users: ${error}`);
    throw new Error('Error occurred while fetching users');
  }
};

export const getProfessorById = async (id: string) => {
  try {
    logger.debug('Fetching professor by id:', { id });
    const professor = await UserRepository.getProfessorById(id);
    if (!professor) {
      logger.info('No professor found');
      throw new Error('No professor found');
    }
    logger.info('Professor fetched successfully', { professor });
    return professor;
  } catch (error) {
    console.error('Error in getProfessorById interactor:', error);
    throw new Error('Error fetching the professor');
  }
};
