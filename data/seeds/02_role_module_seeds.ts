import { Knex } from 'knex';

const roleCategoryTable = 'role_category'
const rolesTable = 'roles';
const actionsTable = 'action'
const permissionCategoriesTable = 'permission_categories';
const permissionsTable = 'permissions';
const rolesPermissionsTable = 'role_permissions';

export const seed = async (knex: Knex): Promise<void> => {
  await knex(roleCategoryTable).insert([
    { id: 1, name: 'admin'},
    { id: 2, name: 'professor'},
    { id: 3, name: 'student'}
  ]);

  await knex(rolesTable).insert([
    { id: 1, name: 'admin', rc_id: 1 },
    { id: 2, name: 'professor', rc_id: 2 },
    { id: 3, name: 'student', rc_id: 3 },
    { id: 4, name: 'intern', rc_id: 3 },
    { id: 5, name: 'program_director', rc_id: 2 },
    { id: 6, name: 'supervisor', rc_id: 3  },
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
    { id: 1, name: 'readReport', display_name: 'Ver el dashboard'},
    { id: 2, name: 'readGraduationReport', display_name: 'Ver reporte de los procesos de graduación'},
    { id: 3, name: 'writeGraduation', display_name: 'Crear proceso de graduación'},
    { id: 4, name: 'readGraduationByStudent', display_name: 'Ver proceso de graduación por estudiantes'},
    { id: 5, name: 'asignGraduation', display_name: 'Asignar proceso de graduación'},
    { id: 6, name: 'listProfessor', display_name: 'Listar docentes'},
    { id: 7, name: 'writeProfessor', display_name: 'Agregar docente'},
    { id: 8, name: 'readProfessorReport', display_name: 'Ver reporte de docente'},
    { id: 9, name: 'appointmentProfessor', display_name: 'Realizar una cita con docente'},
    { id: 10, name: 'deleteProfessor', display_name: 'Eliminar docente'},
    { id: 11, name: 'updateProfessor', display_name: 'Editar información de docente'},
    { id: 12, name: 'readStudent', display_name: 'Ver lista de estudiantes'},
    { id: 13, name: 'addStudent', display_name: 'Agregar estudiante'},
    { id: 14, name: 'deleteStudent', display_name: 'Eliminar estudiante'},
    { id: 15, name: 'updateStudent', display_name: 'Editar información de estudiante'},
    { id: 16, name: 'readStudentReport', display_name: 'Ver reporte de estudiante'},
    { id: 17, name: 'appointmentStudent', display_name: 'Realizar cita con estudiante'},
    { id: 18, name: 'listUser', display_name: 'Ver lista de usuarios'},
    { id: 19, name: 'readUserReport', display_name: 'Ver reporte de usuarios'},
    { id: 20, name: 'deleteUser', display_name: 'Eliminar usuario'},
    { id: 21, name: 'editUser', display_name: 'Editar información de usuario'},
    { id: 22, name: 'addUser', display_name: 'Agregar usuario'},
    { id: 23, name: 'readEvents', display_name: 'Ver eventos disponibles'},
    { id: 24, name: 'readEventsAllTime', display_name: 'Ver historial de eventos'},
    { id: 25, name: 'readEventAssistant', display_name: 'Ver checklist de asistencia al evento'},
    { id: 26, name: 'readEventList', display_name: 'Ver lista de eventos'},
    { id: 27, name: 'readEventDetail', display_name: 'Ver detalles de eventos'},
    { id: 28, name: 'finishEvent', display_name: 'Finalizar evento'},
    { id: 29, name: 'createEvent', display_name: 'Crear evento'},
    { id: 30, name: 'readInternHours', display_name: 'Ver horas becarias'},
    { id: 31, name: 'readEnrollmentEvent', display_name: 'Ver preinscripciones de eventos actuales'},
    { id: 32, name: 'readInterntList', display_name: 'Ver lista de becarios'},
    
  ]);

  await knex(permissionsTable).insert([
    {
      id: 1,
      description: 'Dashboard report',
      action_id: 1,
      pc_id: 1
    },
    {
      id: 2,
      description: 'Graduation process report',
      action_id: 2,
      pc_id: 2
    },
    {
      id: 3,
      description: 'Create graduation process',
      action_id: 3,
      pc_id: 2
    },
    {
      id: 4,
      description: 'Graduation process students',
      action_id: 4,
      pc_id: 2
    },
    {
      id: 5,
      description: 'Assign graduation process',
      action_id: 5,
      pc_id: 2
    },
    {
      id: 6,
      description: 'Professors list',
      action_id: 6,
      pc_id: 3
    },
    {
      id: 7,
      description: 'Add professor',
      action_id: 7,
      pc_id: 3
    },
    {
      id: 8,
      description: 'Professor report',
      action_id: 8,
      pc_id: 3
    },
    {
      id: 9,
      description: 'Schedule an appointment with a professor',
      action_id: 9,
      pc_id: 3
    },
    {
      id: 10,
      description: 'Delete a professor',
      action_id: 10,
      pc_id: 3
    },
    {
      id: 11,
      description: 'Edit a professor',
      action_id: 11,
      pc_id: 3
    },
    {
      id: 12,
      description: 'Students list',
      action_id: 12,
      pc_id: 4
    },
    {
      id: 13,
      description: 'Add student',
      action_id: 13,
      pc_id: 4
    },
    {
      id: 14,
      description: 'Delete a student',
      action_id: 14,
      pc_id: 4
    },
    {
      id: 15,
      description: 'Edit a student',
      action_id: 15,
      pc_id: 4
    },
    {
      id: 16,
      description: 'Student report',
      action_id: 16,
      pc_id: 4
    },
    {
      id: 17,
      description: 'Schedule an appointment with a student',
      action_id: 17,
      pc_id: 4
    },
    {
      id: 18,
      description: 'Users list',
      action_id: 18,
      pc_id: 5
    },
    {
      id: 19,
      description: 'User report',
      action_id: 19,
      pc_id: 5
    },
    {
      id: 20,
      description: 'Delete a user',
      action_id: 20,
      pc_id: 5
    },
    {
      id: 21,
      description: 'Edit a user',
      action_id: 21,
      pc_id: 5
    },
    {
      id: 22,
      description: 'Add a user',
      action_id: 22,
      pc_id: 5
    },
    {
      id: 23,
      description: 'See events available',
      action_id: 23,
      pc_id: 6
    },
    {
      id: 24,
      description: 'See events record',
      action_id: 24,
      pc_id: 6
    },
    {
      id: 25,
      description: 'See checklist',
      action_id: 25,
      pc_id: 6
    },
    {
      id: 26,
      description: 'See events list',
      action_id: 26,
      pc_id: 6
    },
    {
      id: 27,
      description: 'Event details',
      action_id: 27,
      pc_id: 6
    },
    {
      id: 28,
      description: 'Finish event',
      action_id: 28,
      pc_id: 6
    },
    {
      id: 29,
      description: 'Create event',
      action_id: 29,
      pc_id: 6
    },
    {
      id: 30,
      description: 'See scholarship hours',
      action_id: 30,
      pc_id: 7
    },
    {
      id: 31,
      description: 'See preinscriptions',
      action_id: 31,
      pc_id: 8
    },
    {
      id: 32,
      description: 'See interns list',
      action_id: 32,
      pc_id: 9
    },
  ]);
  await knex(rolesPermissionsTable).insert([
    { role_id: 1, permission_id: 1, menu_order: 1 },
    { role_id: 1, permission_id: 18, menu_order: 2 },
    { role_id: 1, permission_id: 2, menu_order: 2 },
    { role_id: 1, permission_id: 23, menu_order: 3 },
    { role_id: 1, permission_id: 26, menu_order: 4 },
    { role_id: 1, permission_id: 28, menu_order: 5 },
    { role_id: 1, permission_id: 32, menu_order: 6 },
    { role_id: 1, permission_id: 24, menu_order: 7 },
    { role_id: 2, permission_id: 1, menu_order: 1 },
    { role_id: 2, permission_id: 11, menu_order: 2 },
    { role_id: 2, permission_id: 7, menu_order: 3 },
    { role_id: 2, permission_id: 6, menu_order: 4 },
    { role_id: 2, permission_id: 10, menu_order: 5 },
    { role_id: 2, permission_id: 9, menu_order: 6 },
    { role_id: 2, permission_id: 8, menu_order: 7 },
    { role_id: 2, permission_id: 2, menu_order: 8 },
    { role_id: 2, permission_id: 3, menu_order: 9 },
    { role_id: 2, permission_id: 4, menu_order: 10 },
    { role_id: 2, permission_id: 5, menu_order: 11 },
    { role_id: 2, permission_id: 12, menu_order: 12 },
    { role_id: 2, permission_id: 13, menu_order: 13 },
    { role_id: 2, permission_id: 14, menu_order: 14 },
    { role_id: 2, permission_id: 15, menu_order: 15 },
    { role_id: 2, permission_id: 16, menu_order: 16 },
  ]);
};
