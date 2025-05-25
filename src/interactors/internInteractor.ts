import * as UserService from '../services/userService';
import Intern from 'src/models/internInterface';
import UserRole from '../constants/roles';
import { createInternService } from '../services/internService';

export const createInternInteractor = async (intern: Intern) => {
  try {
    const { total_hours, pending_hours, completed_hours, ...userData } = intern;
    const userRes = await UserService.createUser({ ...userData, role_id: UserRole.INTERN.id });

    const internInfo = {
      id: userRes.id,
      total_hours,
      pending_hours,
      completed_hours,
    };
    const internResponse = await createInternService(internInfo as Intern);
    return internResponse;
  } catch (error) {
    console.error('Error in createIntern interactor:', error);
    throw error;
  }
};
