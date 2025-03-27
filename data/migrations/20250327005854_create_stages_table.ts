import type { Knex } from 'knex';

export const TABLE_STAGES = 'stages';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_STAGES, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('disabled').defaultTo(false);
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_STAGES);
}
