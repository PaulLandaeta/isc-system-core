import type { Knex } from 'knex';

const defenseDetailsTable = 'defense_details';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(defenseDetailsTable, (table) => {
    table.increments('id').primary();
    table.integer('graduation_process_id').unsigned().notNullable().references('id').inTable('graduation_process').onDelete('CASCADE');
    table.enum('type', ['internal', 'external']).notNullable();
    table.integer('president').unsigned().nullable().references('id').inTable('professors');
    table.integer('first_juror').unsigned().nullable().references('id').inTable('professors');
    table.integer('second_juror').unsigned().nullable().references('id').inTable('professors');
    table.integer('reviewer').unsigned().nullable().references('id').inTable('professors');
    table.integer('tutor').unsigned().nullable().references('id').inTable('professors');
    table.decimal('grade', 4, 2).nullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(defenseDetailsTable);
}