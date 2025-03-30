import { Knex } from 'knex';
const gradprocTable = 'graduation_process';

export async function seed(knex: Knex): Promise<void> {
  await knex(gradprocTable).del();

  await knex(gradprocTable).insert([
    {
      student_id: 7,
      modality_id: 1,
      project_name: 'Sistema de Gestión Académica',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-1',
      tutor_letter: true,
      tutor_id: 2,
      tutor_approval: true,
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: true,
      reviewer_id: 2,
      reviewer_approval: true,
      date_reviewer_assignament: knex.fn.now(),
      stage_id: 1
    }
  ]);
}
