import { getStudentByGraduation as fetchStudentsByGraduation } from './../repositories/studentRepository';
import * as StudentService from '../services/studentService';
import * as UserService from '../services/userService';
import * as UserProfileService from '../services/userProfileService';
import * as UserRoleService from '../services/userRoleService';
import createUserRequest from '../dtos/createUserRequest';
import { NotFoundError } from '../errors/notFoundError';
import { HttpError } from '../errors/httpError';
import createStudentRequest from 'src/dtos/createStudentRequest';

const studentRole = 1;

export const getStudents = async () => {
  const students = await StudentService.getStudents();

  if (!students || students.length === 0) {
    throw new NotFoundError('There are no students');
  }

  return students;
};

export const getStudentByCode = async (studentCode: number) => {
  const student = await StudentService.getStudentByCode(studentCode);

  if (!student) {
    throw new NotFoundError('There is not student with the provide code');
  }
  return student;
};

export const createStudent = async (studentData: createStudentRequest) => {
  try {
    console.log(studentData);
    const existingUser = await StudentService.getStudentByEmail(studentData.email);
    if (existingUser) {
      throw new HttpError(409, 'Ya existe un estudiante con este correo electrónico.');
    }

    const existingUserWithCode = await StudentService.getStudentByCode(Number(studentData.code));
    if (existingUserWithCode) {
      throw new HttpError(409, 'Ya existe un estudiante con este código.');
    }
    
    const { is_scholarship, ...userData } = studentData;
    const newStudent = await UserService.createUser(userData);

    if (!newStudent) {
      throw new HttpError(500, 'Error al crear el estudiante');
    }

    const { id } = newStudent;
    const userRole = await UserRoleService.createUserRole(id, studentRole);
    if (!userRole) {
      throw new Error('Error creating the student Role');
    }

    await StudentService.createStudent({
      ...studentData,
      id: newStudent.id
    });

    return newStudent;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, 'Ocurrió un error inesperado al crear el estudiante');
  }
};

export const deleteStudent = async (studentId: number) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    await UserProfileService.deleteUser(studentId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error((error as Error).message);
  }
};

export const getStudent = async (studentId: number) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return student;
  } catch (error) {
    console.error('Error getting student:', error);
    throw new Error('Error getting student');
  }
};

export const updateStudent = async (studentId: number, studentData: createUserRequest) => {
  try {
    const student = await StudentService.getStudentById(studentId);

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const updatedStudent = await StudentService.updateUser(studentId, studentData);
    return updatedStudent;
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Error updating student');
  }
};

export const getStudentByGraduation = async () => {
  try {
    const students = await StudentService.getStudentByGraduation();
    if (!students) {
      throw new NotFoundError('There are no students without graduation process');
    }
    if (students.length === 0) {
      throw new NotFoundError('There are no students without graduation process');
    }
    return students;
  } catch (error) {
    console.error('Error getting students by graduation:', error);
    throw new Error('Error getting students by graduation');
  }
};
