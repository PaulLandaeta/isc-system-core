import type { Knex } from 'knex';

export const roleAuditTable = 'role_audit';
export const rolesTable = 'roles';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(roleAuditTable, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('disabled').defaultTo(false).notNullable();
    table.string('category').notNullable();
    table.string('changed_by').notNullable();
    table.integer('role_id').notNullable().references('id').inTable('roles');
    table.timestamp('changed_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(roleAuditTable);
}
