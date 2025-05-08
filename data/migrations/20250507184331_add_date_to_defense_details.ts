import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('defense_details', (table) => {
    table.timestamp('date');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('defense_details', (table) => {
    table.dropColumn('date');
  });
}
