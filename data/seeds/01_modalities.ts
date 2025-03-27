import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('modalities').del();

  await knex('modalities').insert([
    { name: 'Proyecto de Grado' },
    { name: 'Trabajo Dirigido' },
    { name: 'Tesis' }
  ]);
}
