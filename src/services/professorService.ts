import createProfessorRequest from '../dtos/createProfessorRequest';
import { storeProfessor } from '../repositories/professorRepository';

export const createProfessorService = async (professor: createProfessorRequest): Promise<any | null> => {
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
