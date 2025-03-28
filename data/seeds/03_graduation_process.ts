import { Knex } from 'knex';
import { TABLE_GRADPROC } from '../migrations/20250327005903_create_graduation_process_table'; // Ruta según tu estructura

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_GRADPROC).del();

  await knex(TABLE_GRADPROC).insert([
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
