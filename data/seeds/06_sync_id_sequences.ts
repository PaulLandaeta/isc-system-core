import { Knex } from 'knex';

export const seed = async (knex: Knex) => {
  const tables = await knex.raw(`
    select table_name
    from information_schema."columns" as t
    where t.column_name = 'id' 
    `);
  for (const table of tables.rows) {
    await knex.raw(`
    select setval(
      pg_get_serial_sequence('${table.table_name}', 'id'),
      coalesce((select max(id) from ${table.table_name}), 1))
      `);
  }
};
