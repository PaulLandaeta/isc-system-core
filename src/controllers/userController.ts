import { Request, Response } from 'express';
import * as userInteractor from '../interactors/userInteractor'
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    await userInteractor.deleteUser(userId);
    sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};