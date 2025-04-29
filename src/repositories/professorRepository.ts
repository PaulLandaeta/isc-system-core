import { buildLogger } from '../plugin/logger';
import db from './pg-connection';

const logger = buildLogger('professorRepository');

const TABLE_NAME = 'professors';
interface professorInterface {
  id: string;
  degree: string;
  department: string;
  specialty: string;
}
export const storeProfessor = async (professor: professorInterface) => {
  try {
    const newProfessor = await db(TABLE_NAME).insert(professor).returning('*');
    if (!newProfessor) {
      logger.debug('Professor have not created');
    }
    return newProfessor;
  } catch (error) {
    logger.error(`Error creating professor: ${error}`);
    throw error;
  }
};
export const getProfessorById = async (userId: string) => {
  try {
    const professor = await db(TABLE_NAME).where('id', userId).first();
    return professor;
  } catch (error) {
    logger.error(`Error fetching professor by id: ${error}`);
    throw error;
  }
};
export const updateProfessor = async (userId: string, professorData: any) => {
  try {
    const updatedProfessor = await db(TABLE_NAME)
      .where('id', userId)
      .update(professorData)
      .returning('*');
    return updatedProfessor;
  } catch (error) {
    logger.error(`Error updating professor: ${error}`);
    throw error;
  }
};

export const deleteProfessor = async (id: string) => {
  try {
    const professorDeleted = await db(TABLE_NAME).where('id', id).delete().returning('*');
    return professorDeleted;
  } catch (error) {
    console.error('Error in professorRepository.deleteProfessor:', error);
    throw new Error('Error deleting Professor');
  }
};
export const getProfessorByCode = async (code: string) => {
  try {
    const professor = await db(`${TABLE_NAME} as p`)
      .join('user_profile as u', 'u.id', 'p.id')
      .where('code', code)
      .first();
    return professor;
  } catch (error) {
    logger.error('Error fetching professor by code: ${error}');
    throw error;
  }
};
