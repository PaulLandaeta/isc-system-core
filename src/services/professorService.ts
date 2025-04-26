import createProfessorRequest from '../dtos/createProfessorRequest';
import * as ProfessorRepository from '../repositories/professorRepository';
import * as StudentRepository from '../repositories/studentRepository';
import { buildLogger } from '../plugin/logger';
import { deleteProfessor, storeProfessor } from '../repositories/professorRepository';

import knex from 'knex';
import knexConfig from '../knexfile';
import { BadRequestError } from '../errors/badRequestError';

const db = knex(knexConfig.development);
export default db;
const logger = buildLogger('professorsService');

export const createProfessorService = async (
  professor: createProfessorRequest
): Promise<any | null> => {
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
