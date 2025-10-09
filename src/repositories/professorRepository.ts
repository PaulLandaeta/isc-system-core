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
  const newProfessor = await db(TABLE_NAME).insert(professor).returning('*');
  return Array.isArray(newProfessor) ? newProfessor[0] : newProfessor;
};

export const getProfessorById = async (userId: string) => {
  const professor = await db(`${TABLE_NAME} as p`)
    .join('user_profile as u', 'u.id', 'p.id')
    .where('p.id', userId)
    .andWhere('p.disabled', false)
    .first();
  return professor;
};

export const updateProfessor = async (userId: string, professorData: any) => {
  const updated = await db(TABLE_NAME)
    .where('id', userId)
    .update(professorData)
    .returning('*');
  return Array.isArray(updated) ? updated[0] : updated;
};

export const deleteProfessor = async (id: string) => {
  const existing = await db(TABLE_NAME).where('id', id).first();
  if (!existing) {
    throw new NotFoundError(`Professor with id ${id} not found`);
  }
  if (existing.disabled) {
    throw new NotFoundError(`Professor with id ${id} not found`);
  }
  const updated = await db(TABLE_NAME).where('id', id).update({ disabled: true }).returning('*');
  return Array.isArray(updated) ? updated[0] : updated;
};

export const getProfessorByCode = async (code: string) => {
  const professor = await db(`${TABLE_NAME} as p`)
    .join('user_profile as u', 'u.id', 'p.id')
    .where('u.code', code)
    .andWhere('p.disabled', false)
    .first();
  return professor;
};

export const getThesisSummaryByTutor = async (tutorId: string) => {
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
};

export const getThesisStudentsByTutor = async (
  tutorId: string,
  filters: {
    type?: string;
    sortBy?: 'date' | 'status';
    order?: 'asc' | 'desc';
  }
) => {
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
};

export const findProcessByTutorId = async (tutorId: string) => {
  return db('graduation_process').where('tutor_id', tutorId).first();
};

export const getProfessors = async () => {
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
};

export const getRolesCountByProfessor = async (professorId: string) => {
  const resTutor = await db('graduation_process').where('tutor_id', professorId).count('*').first();
  const resReviewer = await db('graduation_process').where('reviewer_id', professorId).count('*').first();
  return { resTutor, resReviewer };
};
