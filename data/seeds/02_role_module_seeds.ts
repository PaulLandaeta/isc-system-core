import { Knex } from 'knex';

const roleCategoryTable = 'role_category'
const rolesTable = 'roles';
const actionsTable = 'action'
const permissionCategoriesTable = 'permission_categories';
const permissionsTable = 'permissions';
const rolesPermissionsTable = 'role_permissions';

export const seed = async (knex: Knex): Promise<void> => {
  await knex(roleCategoryTable).insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'professor' },
    { id: 3, name: 'student' }
  ]);

  await knex(rolesTable).insert([
    { id: 1, name: 'admin', rc_id: 1 },
    { id: 2, name: 'professor', rc_id: 2 },
    { id: 3, name: 'student', rc_id: 3 },
    { id: 4, name: 'intern', rc_id: 3 },
    { id: 5, name: 'program_director', rc_id: 2 },
    { id: 6, name: 'supervisor', rc_id: 3 },
  ]);

  await knex(permissionCategoriesTable).insert([
    { id: 1, name: 'report', display_name: 'Reportes' },
    { id: 2, name: 'graduation', display_name: 'Proceso de graduación' },
    { id: 3, name: 'professor', display_name: 'Docentes' },
    { id: 4, name: 'student', display_name: 'Estudiantes' },
    { id: 5, name: 'user', display_name: 'Usuarios' },
    { id: 6, name: 'event', display_name: 'Eventos' },
    { id: 7, name: 'intern_hours', display_name: 'Horas becarias' },
    { id: 8, name: 'enrollment', display_name: 'Preinscripciones' },
    { id: 9, name: 'intern', display_name: 'Becarios' },
  ]);

  await knex(actionsTable).insert([
    { id: 1, name: 'menu', display_name: 'Menú de ' },
    { id: 2, name: 'create', display_name: 'Crear un ' },
    { id: 3, name: 'update', display_name: 'Editar un ' },
    { id: 4, name: 'delete', display_name: 'Borrar un ' },
    { id: 5, name: 'profile', display_name: 'Perfil de ' },
  ]);

  await knex(permissionsTable).insert([
    { id: 1, description: 'Menú de Reporte', action_id: 1, pc_id: 1 },

    { id: 2, description: 'Menú de Graduación', action_id: 1, pc_id: 2 },
    { id: 3, description: 'Crear un Graduación', action_id: 2, pc_id: 2 },
    { id: 4, description: 'Editar un Graduación', action_id: 3, pc_id: 2 },
    { id: 5, description: 'Borrar un Graduación', action_id: 4, pc_id: 2 },

    { id: 6, description: 'Menú de Docente', action_id: 1, pc_id: 3 },
    { id: 7, description: 'Crear un Docente', action_id: 2, pc_id: 3 },
    { id: 8, description: 'Editar un Docente', action_id: 3, pc_id: 3 },
    { id: 9, description: 'Borrar un Docente', action_id: 4, pc_id: 3 },
    { id: 10, description: 'Perfil de Docente', action_id: 5, pc_id: 3 },

    { id: 11, description: 'Menú de Estudiante', action_id: 1, pc_id: 4 },
    { id: 12, description: 'Crear un Estudiante', action_id: 2, pc_id: 4 },
    { id: 13, description: 'Editar un Estudiante', action_id: 3, pc_id: 4 },
    { id: 14, description: 'Borrar un Estudiante', action_id: 4, pc_id: 4 },
    { id: 15, description: 'Perfil de Estudiante', action_id: 5, pc_id: 4 },

    { id: 16, description: 'Menú de Usuario', action_id: 1, pc_id: 5 },
    { id: 17, description: 'Crear un Usuario', action_id: 2, pc_id: 5 },
    { id: 18, description: 'Editar un Usuario', action_id: 3, pc_id: 5 },
    { id: 19, description: 'Borrar un Usuario', action_id: 4, pc_id: 5 },
    { id: 20, description: 'Perfil de Usuario', action_id: 5, pc_id: 5 },

    { id: 21, description: 'Menú de Evento', action_id: 1, pc_id: 6 },
    { id: 22, description: 'Crear un Evento', action_id: 2, pc_id: 6 },
    { id: 23, description: 'Editar un Evento', action_id: 3, pc_id: 6 },
    { id: 24, description: 'Borrar un Evento', action_id: 4, pc_id: 6 },
    { id: 25, description: 'Perfil de Evento', action_id: 5, pc_id: 6 },

    { id: 26, description: 'Menú de Horas becarias', action_id: 1, pc_id: 7 },
    { id: 27, description: 'Crear un Horas becarias', action_id: 2, pc_id: 7 },
    { id: 28, description: 'Editar un Horas becarias', action_id: 3, pc_id: 7 },
    { id: 29, description: 'Borrar un Horas becarias', action_id: 4, pc_id: 7 },
    { id: 30, description: 'Perfil de Horas becarias', action_id: 5, pc_id: 7 },

    { id: 31, description: 'Menú de Preinscripción', action_id: 1, pc_id: 8 },
    { id: 32, description: 'Crear un Preinscripción', action_id: 2, pc_id: 8 },
    { id: 33, description: 'Editar un Preinscripción', action_id: 3, pc_id: 8 },
    { id: 34, description: 'Borrar un Preinscripción', action_id: 4, pc_id: 8 },
    { id: 35, description: 'Perfil de Preinscripción', action_id: 5, pc_id: 8 },

    { id: 36, description: 'Menú de Becario', action_id: 1, pc_id: 9 },
    { id: 37, description: 'Crear un Becario', action_id: 2, pc_id: 9 },
    { id: 38, description: 'Editar un Becario', action_id: 3, pc_id: 9 },
    { id: 39, description: 'Borrar un Becario', action_id: 4, pc_id: 9 },
    { id: 40, description: 'Perfil de Becario', action_id: 5, pc_id: 9 },
  ]);

  await knex(rolesPermissionsTable).insert([
    { role_id: 1, permission_id: 1, menu_order: 1 },
    { role_id: 1, permission_id: 16, menu_order: 2 },
    { role_id: 1, permission_id: 2, menu_order: 3 }, 
    { role_id: 1, permission_id: 21, menu_order: 4 },
    { role_id: 1, permission_id: 36, menu_order: 5 },
    { role_id: 1, permission_id: 31, menu_order: 6 },
    { role_id: 1, permission_id: 24, menu_order: 7 },
    { role_id: 2, permission_id: 1, menu_order: 1 },
    { role_id: 2, permission_id: 8, menu_order: 2 },
    { role_id: 2, permission_id: 7, menu_order: 3 },
    { role_id: 2, permission_id: 6, menu_order: 4 },
    { role_id: 2, permission_id: 10, menu_order: 5 },
    { role_id: 2, permission_id: 9, menu_order: 6 },
    { role_id: 2, permission_id: 2, menu_order: 7 },
    { role_id: 2, permission_id: 3, menu_order: 8 },
    { role_id: 2, permission_id: 4, menu_order: 9 },
    { role_id: 2, permission_id: 5, menu_order: 10 },
    { role_id: 2, permission_id: 11, menu_order: 11 },
    { role_id: 2, permission_id: 12, menu_order: 12 },
    { role_id: 2, permission_id: 13, menu_order: 13 },
    { role_id: 2, permission_id: 14, menu_order: 14 },
    { role_id: 2, permission_id: 15, menu_order: 15 },
    { role_id: 3, permission_id: 1, menu_order: 1 },
    { role_id: 3, permission_id: 11, menu_order: 2 },
    { role_id: 3, permission_id: 15, menu_order: 3 },
    { role_id: 4, permission_id: 36, menu_order: 1 },
    { role_id: 4, permission_id: 40, menu_order: 2 },
    { role_id: 5, permission_id: 1, menu_order: 1 },
    { role_id: 5, permission_id: 6, menu_order: 2 },
    { role_id: 5, permission_id: 7, menu_order: 3 },
    { role_id: 5, permission_id: 8, menu_order: 4 },
    { role_id: 5, permission_id: 10, menu_order: 5 },
    { role_id: 6, permission_id: 1, menu_order: 1 },
    { role_id: 6, permission_id: 11, menu_order: 2 },
    { role_id: 6, permission_id: 15, menu_order: 3 },
  ]);
};
