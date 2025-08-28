import { Knex } from 'knex';

const userProfileTable = 'user_profile';
const permissionCategoriesTable = 'permission_categories';
const roleCategoryTable = 'role_category'
const rolesTable = 'roles';
const actionsTable = 'action'
const rolesPermissionsTable = 'role_permissions';
const permissionsTable = 'permissions';
const professorTable = 'professors';
const eventTable = 'events';
const internsTable = 'interns';
const eventInternTable = 'events_interns';
const stagesTable = 'stages';
const modalitiesTable = 'modalities';
const gradprocTable = 'graduation_process';
const studentsTable = 'students';

exports.seed = async function (knex: Knex) {
  await knex(gradprocTable).whereNotNull('modality_id').del();
  await knex(modalitiesTable).del();
  await knex(roleCategoryTable).del();
  await knex(rolesTable).del();
  await knex(actionsTable).del();
  await knex(userProfileTable).del();
  await knex(permissionCategoriesTable).del();
  await knex(professorTable).del();
  await knex(permissionCategoriesTable).del();
  await knex(internsTable).del();
  await knex(eventTable).del();
  await knex(eventInternTable).del();
  await knex(rolesPermissionsTable).del();
  await knex(stagesTable).del();
  await knex(permissionsTable).del();
  await knex(studentsTable).del();
};
