import createProfessorRequest from '../dtos/createProfessorRequest';
import * as ProfessorRepository from '../repositories/professorRepository';
import * as StudentRepository from '../repositories/studentRepository';
import { buildLogger } from '../plugin/logger';
import { deleteProfessor, storeProfessor } from '../repositories/professorRepository';

import knex from 'knex';
import knexConfig from '../knexfile';

const db = knex(knexConfig.development);
export default db;
const logger = buildLogger('professorsService');

export const createProfessorService = async (
  professor: createProfessorRequest
): Promise<any | null> => {
  try {
    const professorRequest = {
      id: professor.id,
      degree: professor.degree,
      department: 'DTI',
      specialty: 'Dormir',
    };
    const newProfessor = await storeProfessor(professorRequest);
    return newProfessor;
  } catch (error) {
    console.error('Error in createProfessor interactor:', error);
    return null;
  }
};

export const handleProfessorUpdate = async (userId: string, userProfileData: any) => {
  try {
    await StudentRepository.deleteStudent(userId);
    const existingProfessor = await ProfessorRepository.getProfessorById(userId);
    const professorData = {
      id: userId,
      degree: userProfileData.degree,
      department: userProfileData.department,
      specialty: userProfileData.specialty,
    };
    if (existingProfessor) {
      await ProfessorRepository.updateProfessor(userId, professorData);
    } else {
      await ProfessorRepository.storeProfessor(professorData);
    }
  } catch (error) {
    logger.error(`Error updating professor: ${error}`);
    throw error;
  }
};

export const deleteProfessorService = async (id: string) => {
  try {
    const tutorInGraduation = await db('graduation_process').where('tutor_id', id).first();

    if (tutorInGraduation) {
      throw new Error(
        'Unable to delete the professor as they are currently assigned as a tutor in an ongoing graduation process'
      );
    }

    const professorDeleted = await deleteProfessor(id);
    return professorDeleted;
  } catch (error) {
    console.error('Error in professorService.deleteProfessorService:', error);
    throw error;
  }
};

export const getThesisStudentsService = async (
  tutorId: string,
  filters: {
    type?: string;
    sortBy?: 'date' | 'status';
    order?: 'asc' | 'desc';
  }
) => {
  try {
    const modalityMap: Record<string, string> = {
      thesis: 'Tesis',
      tesis: 'Tesis',
      degree_project: 'Proyecto de Grado',
      'proyecto de grado': 'Proyecto de Grado',
      guided_work: 'Trabajo Dirigido',
      'trabajo dirigido': 'Trabajo Dirigido',
    };

    let normalizedType: string | undefined;

    if (filters.type) {
      const key = filters.type.trim().toLowerCase();
      normalizedType = modalityMap[key];

      if (!normalizedType) {
        return {
          summaryByType: {
            thesis: 0,
            'degree project': 0,
            'guided work': 0,
          },
          students: [],
        };
      }
    }

    const normalizedFilters = {
      ...filters,
      type: normalizedType,
    };

    const result = await ProfessorRepository.getThesisStudentsByTutor(
      tutorId,
      normalizedFilters
    );

    return result;
  } catch (error) {
    logger.error(`Error in getThesisStudentsService: ${error}`);
    throw error;
  }
};