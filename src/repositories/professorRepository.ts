import { buildLogger } from '../plugin/logger';
import { NotFoundError } from '../errors/notFoundError';
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
    return Array.isArray(newProfessor) ? newProfessor[0] : newProfessor;
  } catch (error) {
    logger.error(`storeProfessor error: ${error}`);
    throw error;
  }
};

export const getProfessorById = async (userId: string) => {
  try {
    const professor = await db(`${TABLE_NAME} as p`)
      .join('user_profile as u', 'u.id', 'p.id')
      .where('p.id', userId)
      .andWhere('p.disabled', false)
      .first();

    return professor || null;
  } catch (error) {
    logger.error(`getProfessorById error for id=${userId}: ${error}`);
    throw error;
  }
};

export const updateProfessor = async (userId: string, professorData: any) => {
  try {
    const updated = await db(TABLE_NAME)
      .where('id', userId)
      .update(professorData)
      .returning('*');
    return Array.isArray(updated) ? updated[0] : updated;
  } catch (error) {
    logger.error(`updateProfessor error for id=${userId}: ${error}`);
    throw error;
  }
};

export const deleteProfessor = async (id: string) => {
  try {
    const existing = await db(TABLE_NAME).where('id', id).first();
    if (!existing) {
      throw new NotFoundError(`Professor with id ${id} not found`);
    }
    if (existing.disabled) {
      throw new NotFoundError(`Professor with id ${id} not found`);
    }
    const updated = await db(TABLE_NAME).where('id', id).update({ disabled: true }).returning('*');
    return Array.isArray(updated) ? updated[0] : updated;
  } catch (error) {
    logger.error(`deleteProfessor error for id=${id}: ${error}`);
    throw error;
  }
};

export const getProfessorByCode = async (code: string) => {
  try {
    const professor = await db(`${TABLE_NAME} as p`)
      .join('user_profile as u', 'u.id', 'p.id')
      .where('u.code', code)
      .andWhere('p.disabled', false)
      .first();
    return professor || null;
  } catch (error) {
    logger.error(`getProfessorByCode error for code=${code}: ${error}`);
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
    logger.error(`getThesisSummaryByTutor error for tutorId=${tutorId}: ${error}`);
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
    logger.error(`getThesisStudentsByTutor error for tutorId=${tutorId}: ${error}`);
    throw error;
  }
};

export const findProcessByTutorId = async (tutorId: string) => {
  try {
    return await db('graduation_process').where('tutor_id', tutorId).first();
  } catch (error) {
    logger.error(`findProcessByTutorId error for tutorId=${tutorId}: ${error}`);
    throw error;
  }
};

export const getProfessors = async () => {
  try {
    const professors = await db(`${TABLE_NAME} as p`)
      .join('user_profile as up', 'p.id', 'up.id')
      .where('p.disabled', false)
      .select(
        'up.id',
        'up.name',
        'up.lastname',
        'up.mothername',
        'up.email',
        'up.code',
        'up.phone',
        'p.degree'
      );
    return professors;
  } catch (error) {
    logger.error(`getProfessors error: ${error}`);
    throw error;
  }
};

export const getRolesCountByProfessor = async (professorId: string) => {
  try {
    const resTutor = await db('graduation_process').where('tutor_id', professorId).count('*').first();
    const resReviewer = await db('graduation_process').where('reviewer_id', professorId).count('*').first();
    return { resTutor, resReviewer };
  } catch (error) {
    logger.error(`getRolesCountByProfessor error for professorId=${professorId}: ${error}`);
    throw error;
  }
};
