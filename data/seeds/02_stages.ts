import { Knex } from 'knex';
const TABLE_STAGES = 'stages';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_STAGES).del();

  await knex(TABLE_STAGES).insert([
    { id: 1, name: 'Inscripción a seminario' },
    { id: 2, name: 'Tutor' },
    { id: 3, name: 'Revisor' },
    { id: 4, name: 'Revisión de documentos' },
    { id: 5, name: 'Defensa interna' },
    { id: 6, name: 'Revisión de documentos ministerio de educación' },
    { id: 7, name: 'Defensa externa' }
  ]);
}
