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

export const getThesisSummaryByTutor = async (tutorId: string) => {
  try {
    const result = await db('graduation_process as gp')
      .join('modalities as m', 'gp.modality_id', 'm.id')
      .where('gp.tutor_id', tutorId)
      .groupBy('m.name')
      .select('m.name')
      .count('* as count');

    const summaryByType: Record<string, number> = {
      thesis: 0,
      'degree project': 0,
      'guided work': 0,
    };

    result.forEach((row: any) => {
      const name = row.name?.toLowerCase();
      if (name === 'tesis') {
        summaryByType.thesis = Number(row.count);
      }
      if (name === 'proyecto de grado') {
        summaryByType['degree project'] = Number(row.count);
      }
      if (name === 'trabajo dirigido') {
        summaryByType['guided work'] = Number(row.count);
      }
    });

    return summaryByType;
  } catch (error) {
    logger.error(`Error fetching thesis summary by tutor: ${error}`);
    throw error;
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

    return await query;
  } catch (error) {
    logger.error(`Error fetching thesis students by tutor: ${error}`);
    throw error;
  }
};

export const findProcessByTutorId = async (tutorId: string) => {
  return db('graduation_process').where('tutor_id', tutorId).first();
};

export const getRolesCountByProfessor = async (professorId: string) => {
  const resTutor = await db('graduation_process').where('tutor_id', professorId).count('*').first();
  const resReviewer = await db('graduation_process')
    .where('reviewer_id', professorId)
    .count('*')
    .first();
  return { resTutor, resReviewer };
};
