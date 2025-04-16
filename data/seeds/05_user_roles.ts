import { Knex } from 'knex';
const userRolesTable = 'user_roles';

export async function seed(knex: Knex): Promise<void> {
  await knex(userRolesTable).del();

  await knex(userRolesTable).insert([
    {
      user_id: 1,
      role_id: 1
    },
    {
      user_id: 2,
      role_id: 2
    },
    {
      user_id: 3,
      role_id: 4
    },
    {
      user_id: 4,
      role_id: 5
    },
    {
      user_id: 5,
      role_id: 6
    },
    {
      user_id: 6,
      role_id: 3
    },
    {
      user_id: 7,
      role_id: 3
    }    
  ]);
}
