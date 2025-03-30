import { Knex } from 'knex';
const modalitiesTable = 'modalities';
export async function seed(knex: Knex): Promise<void> {
  await knex(modalitiesTable).del();

  await knex(modalitiesTable).insert([
    { id: 1, name: 'Proyecto de Grado', description: 'Modalidad Proyecto de Grado' },
    { id: 2, name: 'Trabajo Dirigido', description: 'Modalidad Trabajo Dirigido' },
    { id: 3, name: 'Tesis', description: 'Modalidad Tesis' }
  ]);
}


