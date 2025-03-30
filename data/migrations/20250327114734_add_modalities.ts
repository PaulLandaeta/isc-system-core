import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('modalities', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('modalities');
}
