import { Request, Response } from 'express';

import * as ProfessorInteractor from '../interactors/professorInteractor';
import { buildLogger } from '../plugin/logger';
import { handleError } from '../handlers/errorHandler';
import { sendCreated, sendSuccess } from '../handlers/successHandler';
import createProfessorRequest from '../dtos/createProfessorRequest';
import { deleteProfessorService } from '../services/professorService';
import { getThesisStudentsService } from '../services/professorService';
import { BadRequestError } from '../errors/badRequestError';
import { HttpError } from '../errors/httpError';

const logger = buildLogger('professorController');

export const getProfessorsController = async (req: Request, res: Response) => {
  try {
    const professors = await ProfessorInteractor.getProfessors();

    if (professors.length === 0) {
      logger.info('No professors found');
      return res.status(404).json({ success: false, message: 'No professors found' });
    }

    logger.info('Professors retrieved successfully');
    sendSuccess(res, professors, 'Professors retrieved successfully');
  } catch (error) {
    logger.error(`Error in getProfessorsController: ${error}`);
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createProfessor = async (req: Request, res: Response) => {
  try {
    const professorData: createProfessorRequest = req.body;
    const newProfessor = await ProfessorInteractor.createProfessor(professorData);
    sendCreated(res, { profesor: newProfessor }, 'Professor created successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getProfessorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const professor = await ProfessorInteractor.getProfessorById(id);
    logger.info('Professor retrieved successfully');
    sendSuccess(res, professor, 'Professor retrieved successfully');
  } catch (error) {
    logger.error(`Error in getProfessorById for id ${id}: ${error}`);
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const deleteProfessorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const professor = await deleteProfessorService(id);
    sendSuccess(res, professor, 'Professor deleted successfully');
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    logger.error(`deleteProfessorController: ${error}`);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getThesisStudentsController = async (req: Request, res: Response) => {
  try {
    const { supervisorId } = req.params;
    const { type, sortBy = 'date', order = 'desc' } = req.query;

    const validSortBy = ['date', 'status'];
    const validOrder = ['asc', 'desc'];

    if (sortBy && !validSortBy.includes(sortBy as string)) {
      throw new BadRequestError('Parámetro "sortBy" inválido');
    }

    if (order && !validOrder.includes(order as string)) {
      throw new BadRequestError('Parámetro "order" inválido');
    }

    const filters = {
      type: type as string | undefined,
      sortBy: sortBy as 'date' | 'status',
      order: order as 'asc' | 'desc',
    };

    const result = await getThesisStudentsService(supervisorId, filters);

    sendSuccess(res, result, 'Tesistas obtenidos correctamente');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
