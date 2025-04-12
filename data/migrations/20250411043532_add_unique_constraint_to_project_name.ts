import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("graduation_process", (table) => {
      table.unique(["project_name"], "unique_project_name");
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("graduation_process", (table) => {
      table.dropUnique(["project_name"], "unique_project_name");
    });
  }