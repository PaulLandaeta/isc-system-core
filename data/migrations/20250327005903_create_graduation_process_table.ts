import type { Knex } from 'knex';

export const gradprocTable = 'graduation_process';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(gradprocTable, table => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().notNullable().references('id').inTable('students');
    table
      .integer('modality_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('modalities')
      .onDelete('CASCADE');
    table.string('project_name').notNullable();
    table.boolean('seminar_enrollment').notNullable().defaultTo(false);
    table.timestamp('date_seminar_enrollment', { precision: 6 }).nullable();
    table.string('period').notNullable();
    table.boolean('tutor_letter').notNullable().defaultTo(false);
    table.integer('tutor_id').unsigned().nullable().references('id').inTable('professors');
    table.boolean('tutor_approval').notNullable().defaultTo(false);
    table.timestamp('date_tutor_assignament', { precision: 6 }).nullable();
    table.boolean('reviewer_letter').notNullable().defaultTo(false);
    table.integer('reviewer_id').unsigned().nullable().references('id').inTable('professors');
    table.boolean('reviewer_approval').notNullable().defaultTo(false);
    table.timestamp('date_reviewer_assignament', { precision: 6 }).nullable();
    table.integer('stage_id').unsigned().notNullable().references('id').inTable('stages');
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(gradprocTable);
}
