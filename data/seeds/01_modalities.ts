import { Knex } from 'knex';
import { TABLE_MODALITIES } from '../migrations/20250327005703_create_modalities_table'; 
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_MODALITIES).del();

  await knex(TABLE_MODALITIES).insert([
    { id: 1, name: 'Proyecto de Grado' },
    { id: 2, name: 'Trabajo Dirigido' },
    { id: 3, name: 'Tesis' }
  ]);
}


