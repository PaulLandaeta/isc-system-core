import createUserRequest from '../dtos/createUserRequest';
import createStudentRequest from '../dtos/createStudentRequest';
import Student from '../models/studentInterface';
import * as UserRepository from '../repositories/userRepository';
import * as UserProfileRepository from '../repositories/userProfileRepository';
import * as StudentRepository from '../repositories/studentRepository';
import * as ProfessorRepository from '../repositories/professorRepository';
import { buildLogger } from '../plugin/logger';
const logger = buildLogger('studentsService');

export const getStudents = async (): Promise<Student[]> => {
  try {
    return await UserRepository.getStudents();
  } catch (error) {
    logger.error(`Error fetching students: ${error}`);
    throw error;
  }
};

export const getStudentByCode = async (userCode: number): Promise<Student | null> => {
  try {
    return await UserRepository.getStudentByCode(userCode);
  } catch (error) {
    logger.error(`Error fetching student by code ${userCode}: ${error}`);
    throw error;
  }
};

export const getStudentByEmail = async (email: string): Promise<Student | null> => {
  try {
    return await UserRepository.getUserByEmail(email);
  } catch (error) {
    logger.error(`Error fetching student by email ${email}: ${error}`);
    throw error;
  }
};

export const getStudentById = async (studentId: number): Promise<Student | null> => {
  try {
    return await UserProfileRepository.getUserById(studentId);
  } catch (error) {
    logger.error(`Error fetching student by id ${studentId}: ${error}`);
    throw error;
  }
};

export const updateUser = async (
  studentId: number,
  studentData: createUserRequest
): Promise<createUserRequest | null> => {
  try {
    return await UserRepository.updateUser(studentId, studentData);
  } catch (error) {
    logger.error(`Error updating user ${studentId}: ${error}`);
    throw error;
  }
};

export const createStudent = async (student: createStudentRequest): Promise<any | null> => {
  try {
    const studentRequest = {
      id: student.id,
      is_scholarship: student.is_scholarship,
    };
    const newStudent = await StudentRepository.storeStudent(studentRequest);
    return newStudent;
  } catch (error) {
    logger.error(`Error in createStudent interactor: ${error}`);
    throw error;
  }
};

export const handleStudentUpdate = async (userId: string, userProfileData: any) => {
  try {
    await ProfessorRepository.deleteProfessor(userId);
    const existingStudent = await StudentRepository.getStudentById(userId);
    const studentData = {
      id: userId,
      is_scholarship: userProfileData.is_scholarship,
    };
    if (existingStudent) {
      await StudentRepository.updateStudent(userId, studentData);
    } else {
      await StudentRepository.storeStudent(studentData);
    }
  } catch (error) {
    logger.error(`Error updating student: ${error}`);
    throw error;
  }
};

export const getStudentByGraduation = async () => {
  try {
    const students = await StudentRepository.getStudentByGraduation();
    logger.debug(`Fetching students without graduation process ${students}`);
    return Array.isArray(students) ? students : [];
  } catch (error) {
    logger.error(`Error fetching students without graduation process: ${error}`);
    throw error;
  }
};

export const getStudentByPhone = async (phone: string): Promise<any | null> => {
  try {
    const userFromUsers = await UserRepository.getUserByPhone(phone);
    if (userFromUsers) return userFromUsers;
    const userFromProfile = await UserProfileRepository.getUserByPhone(phone);
    return userFromProfile;
  } catch (error) {
    logger.error(`Error fetching student by phone ${phone}: ${error}`);
    throw error;
  }
};
