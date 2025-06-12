import createGraduationProcessRequest from '../dtos/createGraduationProcessRequest';
import NewGraduationProcess from '../dtos/newGraduationProcess';
import { BadRequestError } from '../errors/badRequestError';
import { NotFoundError } from '../errors/notFoundError';
import { DefenseDetail } from '../models/defenseDetailInterface';
import GraduationProcess from '../models/graduationProcessInterface';
import * as GraduationProcessService from '../services/graduationService';
import UserRole from '../constants/roles';
import { getUserByCode } from '../repositories/userRepository';
import { ConflictError } from '../errors/conflictError';

export const getGraduationProcessById = async (processId: number) => {
  const process = await GraduationProcessService.getGraduationProcessById(processId);

  if (!process) {
    throw new NotFoundError('There is no process');
  }

  return process;
};

export const updateGraduationProcess = async (
  processId: number,
  updatedData: Partial<GraduationProcess>
) => {
  try {
    const updatedGraduationProcess = await GraduationProcessService.updateGraduationProcess(
      processId,
      updatedData
    );
    return updatedGraduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessService.updateGraduationProcess:', error);
    throw new Error('Error updating Graduation Process');
  }
};

export const createGraduationProcess = async (
  graduationProcess: createGraduationProcessRequest
) => {
  const user = await getUserByCode(graduationProcess.student_code);

  const validRoles = [UserRole.STUDENT.id, UserRole.INTERN.id];

  if (!user || !validRoles.includes(user.role_id)) {
    throw new BadRequestError('El usuario no existe o no es un estudiante');
  }

  const process = await GraduationProcessService.getProcessByName(graduationProcess.project_name);

  if (process) {
    throw new ConflictError('Ya existe un proceso con el mismo nombre');
  }

  const newGraduationProcess: NewGraduationProcess = {
    modality_id: graduationProcess.modality_id,
    period: graduationProcess.period,
    project_name: graduationProcess.project_name,
    student_id: user.id,
  };

  return await GraduationProcessService.createGraduationProcess(newGraduationProcess);
};


export const getGraduationProcesses = async () => {
  const graduationProcesses = await GraduationProcessService.getGraduationProcesses();
  if (!graduationProcesses) {
    throw new NotFoundError('No graduation processes found');
  }
  return graduationProcesses;
};

export const createDefense = async (processId: number, defenseData: DefenseDetail) => {
  return await GraduationProcessService.createDefense(processId, defenseData);
};

export const updateDefense = async (defenseId: number, updatedData: Partial<DefenseDetail>) => {
  const existingDefense = await GraduationProcessService.getDefenseById(defenseId);
  if (!existingDefense) {
    throw new NotFoundError('Defense not found');
  }

  return await GraduationProcessService.updateDefense(defenseId, updatedData);
};

export const getDefense = async (processId: number, type: string) => {
  return await GraduationProcessService.getDefense(processId, type);
};
