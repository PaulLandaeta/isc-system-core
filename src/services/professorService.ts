import createProfessorRequest from '../dtos/createProfessorRequest';
import * as ProfessorRepository from '../repositories/professorRepository';
import * as StudentRepository from '../repositories/studentRepository';
import { buildLogger } from '../plugin/logger';
import { deleteProfessor, findProcessByTutorId, storeProfessor } from '../repositories/professorRepository';
import { modalityMap } from '../constants/modalityMap';

import { BadRequestError } from '../errors/badRequestError';
import { HttpError } from '../errors/httpError';

const logger = buildLogger('professorsService');

export const createProfessorService = async (professor: createProfessorRequest): Promise<any | null> => {
  try {
    const existingProfessor = await ProfessorRepository.getProfessorByCode(professor.code);
    if (existingProfessor) {
      throw new BadRequestError('Professor code already exists');
    }
    const professorRequest = {
      id: professor.id,
      degree: professor.degree,
      department: 'DTI',
      specialty: 'Dormir',
    };
    const newProfessor = await storeProfessor(professorRequest);
    return newProfessor;
  } catch (error) {
    console.error('Error in createProfessor interactors:', error);
    if (error instanceof BadRequestError) {
      throw error;
    } else {
      throw new Error('Error creating the professor');
    }
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
    const tutorInGraduation = await findProcessByTutorId(id);

    if (tutorInGraduation) {
      throw new HttpError(
        409,
        'No se puede eliminar el profesor: está asignado como tutor en un proceso de graduación activo'
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
    let normalizedType: string | undefined;

    if (filters.type) {
      const normalizedKey = filters.type.trim().toLowerCase();

      const modalityNormalizer: Record<string, string> = {};
      for (const [key, value] of Object.entries(modalityMap)) {
        modalityNormalizer[key.toLowerCase()] = value;
        modalityNormalizer[value.toLowerCase()] = value;
      }

      normalizedType = modalityNormalizer[normalizedKey];

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

    const students = await ProfessorRepository.getThesisStudentsByTutor(
      tutorId,
      normalizedFilters
    );

    const summary = await ProfessorRepository.getThesisSummaryByTutor(tutorId);

    return {
      summaryByType: summary,
      students: students
    };
  } catch (error) {
    logger.error(`Error in getThesisStudentsService: ${error}`);
    throw error;
  }
};
