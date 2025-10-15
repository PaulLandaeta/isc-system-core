import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('graduation_process', table => {
    table.timestamp('reviewer_approval_date').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('graduation_process', table => {
    table.dropColumn('reviewer_approval_date');
  });
}
