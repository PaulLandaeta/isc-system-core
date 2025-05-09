import UserRole from '../constants/roles';
import createUserRequest from '../dtos/createUserRequest';
import User from '../models/userInterface';
import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('userRepository');

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db('user_profile as u')
      .where('u.email', email)
      .join('roles as r', 'u.role_id', '=', 'r.id')
      .first('u.*', db.raw('array_agg(r.name) as roles'))
      .groupBy('u.id');
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const students = await db('user_profile as u')
      .select(
        'u.id',
        'u.code',
        db.raw("CONCAT(u.name, ' ', u.lastname, ' ', u.mothername) as name"),
        'u.email',
        'u.phone'
      )
      .where('u.role_id', UserRole.STUDENT.id);

    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getStudentByCode = async (userCode: number) => {
  try {
    const student = await db('user_profile as u')
      .select(
        'u.id',
        'u.name as student_name',
        'u.lastname as lastName',
        'u.mothername as motherName',
        'u.code'
      )
      .join('user_roles as ur', 'u.id', '=', 'ur.user_id')
      .where('ur.role_id', UserRole.STUDENT.id)
      .andWhere('u.code', userCode)
      .first();

    return student || null;
  } catch (error) {
    console.error('Error in getStudentByCode:', error);
    throw new Error('Error fetching student by code');
  }
};

export const createUser = async (userData: User) => {
  try {
    const [maxId] = await db('user_profile').max('id as max_id');
    const maxIdValue = maxId?.max_id || 0; 

    if (maxIdValue > 0) {
      await db.raw(`SELECT setval(pg_get_serial_sequence('user_profile', 'id'), ?, true)`, [maxIdValue]);
    }

    const [newUser] = await db('user_profile').insert(userData).returning('id');

    return newUser;
  } catch (error) {
    console.error(error);  
    throw error;
  }
};


export const getProfessors = async () => {
  try {
    // TODO: fix getting tutorias and revisiones
    logger.debug('Fetching professors');
    const professors = await db('professors as p')
      .select(
        'up.id',
        'up.name as name',
        'up.lastname as lastName',
        'up.mothername as motherName',
        'up.email as email',
        'up.code as code',
        'up.phone as phone',
        'p.degree as degree',
        db.raw("CONCAT(up.name, ' ', up.lastname, ' ', up.mothername) as fullname")
      )
      .join('user_profile as up', 'p.id', '=', 'up.id');
    logger.info('Professors fetched successfully.');
    logger.debug(`Fetched professors: ${JSON.stringify(professors)}`);
    return professors;
  } catch (error) {
    logger.error(`Error fetching professors: ${error}`);
    throw Error('Error');
  }
};
/**
 * Update user data
 * @param userId User id
 * @param userData User data
 * @returns Updated user data
 */
export const updateUser = async (userId: number, userData: createUserRequest) => {
  try {
    const allowedFields = {
      name: userData.name,
      lastname: userData.lastname,
      mothername: userData.mothername,
      code: userData.code,
      email: userData.email,
      phone: userData.phone
    };
    await db('user_profile').where('id', userId).update(allowedFields);
    return allowedFields;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUserByRol = async (rolId: number) => {
  try {
    const usersByRol = await db('user_profile').where('role_id', rolId).returning('*');
    return usersByRol;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Get professor by id
 * @param id Professor id
 * @returns Professor data
 */
export const getProfessorById = async (id: string) => {
  try {
    const professor = await db('professors as p')
      .select(
        'up.id',
        'up.name as name',
        'up.lastname as lastName',
        'up.mothername as motherName',
        'up.email as email',
        'up.code as code',
        'up.phone as phone',
        'p.degree as degree',
        db.raw("CONCAT(up.name, ' ', up.lastname, ' ', up.mothername) as fullname")
      )
      .join('user_profile as up', 'p.id', '=', 'up.id')
      .where('up.id', id)
      .first();
    return professor;
  } catch (error) {
    logger.error(`Error in getProfessorById for id: ${id}`);
    throw new Error(`Unable to retrieve professor with id: ${id}`);
  }
};
export const getUserByCode = async (userCode: number) => {
  try {
    const student = await db('user_profile as u')
      .select(
        'u.id',
        'u.name as student_name',
        'u.lastname as lastName',
        'u.mothername as motherName',
        'u.code',
        'u.role_id'
      )
      .join('roles as r', 'u.role_id', '=', 'r.id')
      .where('u.code', userCode)
      .first();

    return student || null;
  } catch (error) {
    console.error('Error in getUserByCode:', error);
    throw new Error('Error fetching student by code');
  }
};

export const getUserById = async (userId: number) => {
  try {
    const user = await db('user_profile as u')
      .join('roles as r', 'u.role_id', '=', 'r.id')
      .where('u.id', userId)
      .select(
        'u.id',
        'u.role_id',
        'r.name as role'
      )
      .first();
    return user || null;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw new Error('Error fetching user by ID');
  }
};
