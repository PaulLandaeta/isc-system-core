import * as UserRoleService from '../services/userRoleService';
import { createUserService } from '../services/adminService';
import createUserRequest from '../dtos/createUserRequest';
import genericUser from '../models/genericUser';

const adminRole = 1;

export const createAdmin = async (studentData: createUserRequest) => {
  try {
    const newStudent = await createUser({
      ...studentData,
      role_id: studentData.role_id ?? 1,
    });
    if (!newStudent) {
      throw new Error('Error creating the admin');
    }

    const { id } = newStudent;
    const userRole = await UserRoleService.createUserRole(id, adminRole);
    if (!userRole) {
      throw new Error('Error creating the admin Role');
    }

    return newStudent;
  } catch (error) {
    console.error('Error in createAdmin interactor:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error creating the admin');
  }
};

export const createUser = async (userData: genericUser) => {
  try {
    if (!userData.name || userData.name.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres válidos.');
    }

    if (!userData.lastname || userData.lastname.trim().length < 2) {
      throw new Error('El apellido debe tener al menos 2 caracteres válidos.');
    }

    if (userData.mothername && userData.mothername.trim().length < 2) {
      throw new Error('El nombre de la madre debe tener al menos 2 caracteres válidos.');
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
      throw new Error('El email no tiene un formato válido.');
    }

    if (!/^\d{7,10}$/.test(userData.phone)) {
      throw new Error('El teléfono debe tener entre 7 y 10 dígitos numéricos.');
    }

    const newUser = await createUserService({
      ...userData,
      role_id: userData.role_id ?? 1,
    });

    if (!newUser) {
      throw new Error('Error creating the User');
    }

    return newUser;
  } catch (error) {
    console.error('Error in createUser interactor:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error creating the user');
  }
};
