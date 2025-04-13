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

export const getThesisStudentsByTutor = async (
  tutorId: string,
  filters: {
    type?: string;
    sortBy?: 'date' | 'status';
    order?: 'asc' | 'desc';
  }
) => {
  try {
    const { type, sortBy, order } = filters;

    const sortField = sortBy === 'status' ? 'gp.stage_id' : 'gp.date_tutor_assignament';
    const sortOrder = order || 'desc';

    const query = db('graduation_process as gp')
      .join('user_profile as u', 'gp.student_id', 'u.id')
      .join('modalities as m', 'gp.modality_id', 'm.id')
      .join('stages as s', 'gp.stage_id', 's.id')
      .where('gp.tutor_id', tutorId);

    if (type) {
      query.andWhere('m.name', type);
    }

    query.select(
      db.raw("CONCAT(u.name, ' ', u.lastname, ' ', u.mothername) as name"),
      'u.email',
      'm.name as modality',
      's.name as stage',
      'gp.date_tutor_assignament as assignedAt'
    );

    query.orderBy(sortField, sortOrder);

    const students = await query;

    const counts: Record<string, number> = {
      'Tesis': 0,
      'Proyecto de Grado': 0,
      'Trabajo Dirigido': 0,
    };

    students.forEach((student) => {
      const modality = student.modality;
      if (counts[modality] !== undefined) {
        counts[modality]++;
      }
    });

    const summaryByType = {
      thesis: counts['Tesis'],
      'degree project': counts['Proyecto de Grado'],
      'guided work': counts['Trabajo Dirigido'],
    };

    return {
      summaryByType,
      students,
    };
  } catch (error) {
    logger.error(`Error fetching thesis students by tutor: ${error}`);
    throw error;
  }
};