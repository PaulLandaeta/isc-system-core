import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("graduation_process", (table) => {
      table.timestamp("tutor_approval_date").nullable();
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("graduation_process", (table) => {
      table.dropColumn("tutor_approval_date");
    });
  }