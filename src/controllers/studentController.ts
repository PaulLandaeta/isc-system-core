import { Request, Response } from 'express';

import createStudentRequest from '../dtos/createStudentRequest';
import { HttpError } from '../errors/httpError';
import * as StudentInteractor from '../interactors/studentInteractor';
import createUserRequest from '../dtos/createUserRequest';
import { handleError } from '../handlers/errorHandler';
import { sendCreated, sendSuccess } from '../handlers/successHandler';

const deepSanitize = (input: any): any => {
  if (input === null || input === undefined) return input;
  if (Array.isArray(input)) return input.map((i) => deepSanitize(i));
  if (typeof input === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(input)) {
      if (k === 'password') continue;
      out[k] = deepSanitize(v);
    }
    return out;
  }
  return input;
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentInteractor.getStudents();
    const safe = deepSanitize(students);
    sendSuccess(res, safe, 'Students retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData: createStudentRequest = req.body;
    const newStudent = await StudentInteractor.createStudent(studentData);
    const safe = deepSanitize(newStudent);
    sendCreated(res, safe, 'Student created successfully');
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStudentByCode = async (req: Request, res: Response) => {
  const userCode = parseInt(req.params.code);

  try {
    const student = await StudentInteractor.getStudentByCode(userCode);
    const safe = deepSanitize(student);
    sendSuccess(res, safe, 'Student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    await StudentInteractor.deleteStudent(userId);
    sendSuccess(res, null, 'Student deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const student = await StudentInteractor.getStudent(userId);
    const safe = deepSanitize(student);
    sendSuccess(res, safe, 'Student retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const studentData: createUserRequest = req.body;

  try {
    const student = await StudentInteractor.updateStudent(userId, studentData);
    const safe = deepSanitize(student);
    sendSuccess(res, safe, 'Student updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const getStudentByGraduation = async (req: Request, res: Response) => {
  try {
    const students = await StudentInteractor.getStudentByGraduation();
    const safe = deepSanitize(students);
    sendSuccess(res, safe, 'Students retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
