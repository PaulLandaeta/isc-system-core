import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  // timestamps
  await knex.schema.alterTable('user_roles', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable('knex_migrations', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable('knex_migrations_lock', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable('students', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('professors', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable('permission_categories', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  // permissions ordering to the table role_permissions
  await knex.schema.alterTable('role_permissions', (table) =>{
    table.integer('menu_order').notNullable();
  });

}

export async function down(knex: Knex): Promise<void> {

 // timestamps
 await knex.schema.alterTable('user_roles', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  await knex.schema.alterTable('knex_migrations', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
  await knex.schema.alterTable('knex_migrations_lock', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
  
  await knex.schema.alterTable('students', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('professors', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('permission_categories', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('role_permissions', (table) => {
    table.dropColumn('menu_order');
  });

}