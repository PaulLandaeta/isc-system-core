import type { Knex } from 'knex';

const tableNameRoles = 'roles';
const tableNamePermissions = 'permissions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('role_category', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable('action', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('display_name').notNullable().unique();
    })
    .createTable('permission_categories', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('display_name').notNullable();
    })
    .createTable('roles', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.boolean('disabled').notNullable().defaultTo(false);
      table
        .integer('rc_id')
        .unsigned()
        .references('id')
        .inTable('role_category')
        .onDelete('CASCADE')
      table.timestamps(true, true);
    })
    .createTable('permissions', function (table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table
        .integer('action_id')
        .unsigned()
        .references('id')
        .inTable('action')
        .onDelete('CASCADE')
      table
        .integer('pc_id')
        .unsigned()
        .references('id')
        .inTable('permission_categories')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('role_permissions', function (table) {
      table.integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE');
      table.primary(['role_id', 'permission_id']);
    })
    .createTable('user_profile', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('lastname').notNullable();
      table.string('mothername').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone').notNullable();
      table
        .integer('rc_id')
        .unsigned()
        .references('id')
        .inTable('role_category')
        .onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable('students', function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.string('code').notNullable().unique();
      table.boolean('is_scholarship').defaultTo(false);
    })
    .createTable('professors', function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table.string('degree');
      table.string('department').notNullable();
      table.string('specialty').notNullable();
    })
    .createTable('user_roles', function (table) {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user_profile')
        .onDelete('CASCADE');
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table.primary(['user_id', 'role_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('teachers')
    .dropTableIfExists('students')
    .dropTableIfExists('user_profile')
    .dropTableIfExists('role_category')
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('action')
    .dropTableIfExists('permissions')
    .dropTableIfExists('permission_categories')
    .dropTableIfExists('roles')
}
