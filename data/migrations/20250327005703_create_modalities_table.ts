import type { Knex } from 'knex';

export const modalitiesTable = 'modalities';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(modalitiesTable, table => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('description').notNullable();
    table.boolean('disabled').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(modalitiesTable);
}
