import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('stages').del();

  await knex('stages').insert([
    { name: 'Inscripción a seminario' },
    { name: 'Tutor' },
    { name: 'Revisor' },
    { name: 'Revisión de documentos' },
    { name: 'Defensa interna' },
    { name: 'Revisión de documentos ministerio de educación' },
    { name: 'Defensa externa' }
  ]);
}
