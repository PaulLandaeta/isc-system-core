import Intern from '../models/internInterface';
import * as UserService from '../services/userService';
import * as StudentService from '../services/studentService';
import UserRole from '../constants/roles';
import { createInternService } from '../services/internService';

export const createInternInteractor = async (intern: Intern) => {
  try {
    const userRes = await UserService.createUser({
      name: intern.name,
      lastname: intern.lastname,
      email: intern.email,
      code: intern.code,
      phone: intern.phone,
      mothername: intern.mothername,
      role_id: UserRole.INTERN.id,
    });

    await StudentService.createStudent({ is_scholarship: true, id: userRes.id } as any);

    const internInfo = {
      id: userRes.id,
      total_hours: intern.total_hours,
      pending_hours: intern.pending_hours,
      completed_hours: intern.completed_hours,
    };
    const internResponse = await createInternService(internInfo as Intern);
    return internResponse;
  } catch (error) {
    console.error('Error in createIntern interactor:', error);
    throw error;
  }
};
