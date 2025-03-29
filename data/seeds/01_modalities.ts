import { Knex } from 'knex';
const TABLE_MODALITIES = 'modalities';
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_MODALITIES).del();

  await knex(TABLE_MODALITIES).insert([
    { id: 1, name: 'Proyecto de Grado' },
    { id: 2, name: 'Trabajo Dirigido' },
    { id: 3, name: 'Tesis' }
  ]);
}


