import type { Knex } from 'knex';

const tableNameRoleCategory = 'role_category';
const tableNameActions = 'action';
const tableNamePermissionCategory = 'permission_categories';
const tableNameRoles = 'roles';
const tableNameRolePermission = 'role_permissions';
const tableNameUser = 'user_profile';
const tableNamePermissions = 'permissions';
const tableNameStudents = 'students';
const tableNameTeacher = 'professors'
const tableNameUserRole = 'user_roles';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableNameRoleCategory, function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable(tableNameActions, function(table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('display_name').notNullable().unique();
    })
    .createTable(tableNamePermissionCategory, function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('display_name').notNullable();
    })
    .createTable(tableNameRoles, function (table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.boolean('disabled').notNullable().defaultTo(false);
      table
        .integer('rc_id')
        .unsigned()
        .references('id')
        .inTable(tableNameRoleCategory)
        .onDelete('CASCADE')
      table.timestamps(true, true);
    })
    .createTable(tableNamePermissions, function (table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table
        .integer('action_id')
        .unsigned()
        .references('id')
        .inTable(tableNameActions)
        .onDelete('CASCADE')
      table
        .integer('pc_id')
        .unsigned()
        .references('id')
        .inTable(tableNamePermissionCategory)
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable(tableNameRolePermission, function (table) {
      table.integer('role_id')
        .unsigned()
        .references('id')
        .inTable(tableNameRoles)
        .onDelete('CASCADE');
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable(tableNamePermissions)
        .onDelete('CASCADE');
      table.primary(['role_id', 'permission_id']);
    })
    .createTable(tableNameUser, function (table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
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
        .inTable(tableNameRoleCategory)
        .onDelete('SET NULL');
      table.timestamps(true, true);
    })
    .createTable(tableNameStudents, function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable(tableNameUser)
        .onDelete('CASCADE');
      table.string('code').notNullable().unique();
      table.boolean('is_scholarship').defaultTo(false);
    })
    .createTable(tableNameTeacher, function (table) {
      table
        .integer('id')
        .unsigned()
        .primary()
        .references('id')
        .inTable(tableNameUser)
        .onDelete('CASCADE');
      table.string('degree');
      table.string('department').notNullable();
      table.string('specialty').notNullable();
    })
    .createTable(tableNameUserRole, function (table) {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable(tableNameUser)
        .onDelete('CASCADE');
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(tableNameRoles)
        .onDelete('CASCADE');
      table.primary(['user_id', 'role_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(tableNameUserRole)
    .dropTableIfExists(tableNameTeacher)
    .dropTableIfExists(tableNameStudents)
    .dropTableIfExists(tableNameUser)
    .dropTableIfExists(tableNameRoleCategory)
    .dropTableIfExists(tableNameRolePermission)
    .dropTableIfExists(tableNameActions)
    .dropTableIfExists(tableNamePermissions)
    .dropTableIfExists(tableNamePermissionCategory)
    .dropTableIfExists(tableNameRoles)
}
