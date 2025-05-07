import type { Knex } from 'knex';

const userProfileTable = 'user_profile';
const studentTable = 'students';
const professorTable = 'professors'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(userProfileTable, table => {
    table.string('code').nullable();
  });
  await knex.schema.alterTable(studentTable, table => {
    table.dropColumn('code');
  });
  await knex.schema.alterTable(professorTable, table => {
    table.boolean('disabled').notNullable().defaultTo(false);
  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(userProfileTable, table => {
    table.dropColumn('code');
  });
  await knex.schema.alterTable(studentTable, table => {
    table.string('code').notNullable();
  });
  await knex.schema.alterTable(professorTable, table => {
    table.dropColumn('disabled');
  });
}
