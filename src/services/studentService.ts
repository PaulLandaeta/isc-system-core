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
  return UserRepository.getStudents();
};

export const getStudentByCode = async (userCode: number): Promise<Student | null> => {
  return UserRepository.getStudentByCode(userCode);
};

export const getStudentByEmail = async (email: string): Promise<Student | null> => {
  return UserRepository.getUserByEmail(email);
};

export const getStudentById = async (studentId: number): Promise<Student | null> => {
  return UserProfileRepository.getUserById(studentId);
};

export const updateUser = async (
  studentId: number,
  studentData: createUserRequest
): Promise<createUserRequest | null> => {
  return UserRepository.updateUser(studentId, studentData);
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
  const userFromUsers = await UserRepository.getUserByPhone(phone);
  if (userFromUsers) return userFromUsers;
  const userFromProfile = await UserProfileRepository.getUserByPhone(phone);
  return userFromProfile;
};
