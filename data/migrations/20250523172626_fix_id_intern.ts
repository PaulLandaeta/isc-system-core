import type { Knex } from "knex";

const tableIntern = 'interns'
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableIntern, function(table) {
    table.dropColumn('user_profile_id');
  });

  await knex.schema.alterTable(tableIntern, function(table) {
    table
      .foreign('id')
      .references('id')
      .inTable('user_profile')
      .onDelete('CASCADE')
  });

}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableIntern, function(table) {
    table.dropForeign(['id'])
  })

  await knex.schema.alterTable(tableIntern, function(table) {
    table
      .integer('user_profile_id')
      .unsigned()
      .references('id')
      .inTable('user_profile')
      .onDelete('CASCADE')
  })


}

