import type { Knex } from 'knex';

export const modalitiesTable = 'modalities';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(modalitiesTable, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('disabled').defaultTo(false);
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(modalitiesTable);
}
