import { buildLogger } from '../plugin/logger';
import db from './pg-connection';
import UserRole from '../constants/roles';

const logger = buildLogger('studentRepository');

const TABLE_NAME = 'students';
interface studentInterface {
  id: number;
  is_scholarship: boolean;
}
export const storeStudent = async (student: studentInterface) => {
  try {
    const newStudent = await db(TABLE_NAME).insert(student).returning('*');
    if (!newStudent) {
      logger.debug('Student have not created');
    }
    return newStudent;
  } catch (error) {
    logger.error(`Error creating student: ${error}`);
    throw error;
  }
};
export const getStudentById = async (userId: number) => {
  try {
    const student = await db(TABLE_NAME).where('id', userId).first();
    return student;
  } catch (error) {
    logger.error(`Error fetching student by id: ${error}`);
    throw error;
  }
};
export const updateStudent = async (userId: number, studentData: any) => {
  try {
    const updatedStudent = await db(TABLE_NAME)
      .where('id', userId)
      .update(studentData)
      .returning('*');
    return updatedStudent;
  } catch (error) {
    logger.error(`Error updating student: ${error}`);
    throw error;
  }
};
export const deleteStudent = async (userId: string) => {
  try {
    await db(TABLE_NAME).where('id', userId).delete();
  } catch (error) {
    logger.error(`Error deleting student: ${error}`);
    throw error;
  }
};

export const getStudentByGraduation = async () => {
  try {
    logger.debug('Fetching students without graduation process');
    
    const students = await db('user_profile as u')
      .leftJoin('graduation_process as gp', 'u.id', 'gp.student_id')
      .where('u.role_id', UserRole.STUDENT.id)
      .whereNull('gp.student_id')
      .select(
        'u.id',
        'u.code',
        db.raw("CONCAT(u.name, ' ', u.lastname, ' ', u.mothername) as name"),
        'u.email',
        'u.phone'
      );

    return students;
  } catch (error) {
    logger.error(`Error fetching students without graduation process: ${error}`);
    throw error;
  }
};
