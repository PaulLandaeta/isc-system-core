
import { Knex } from 'knex';


const gradProcTable = 'graduation_process';
const stagesTable = 'stages';
const modalitiesTable = 'modalities';


export const seed = async (knex: Knex): Promise<void> => {
 
  
  await knex(modalitiesTable).insert([
    {
      id: 1,
      name: 'Proyecto de Grado',
      description: 'Modalidad Proyecto de Grado'
    },
    {
      id: 2,
      name: 'Trabajo Dirigido',
      description: 'Modalidad Trabajo Dirigido'
    },
    {
      id: 3,
      name: 'Tesis',
      description: 'Modalidad Tesis'
    }
  ]);


  
  await knex(stagesTable).insert([
    { id: 1, name: 'Inscripción a seminario' },
    { id: 2, name: 'Tutor' },
    { id: 3, name: 'Revisor' },
    { id: 4, name: 'Revisión de documentos' },
    { id: 5, name: 'Defensa interna' },
    { id: 6, name: 'Revisión de documentos ministerio de educación' },
    { id: 7, name: 'Defensa externa' }
  ]);


  
  await knex(gradProcTable).insert([
    {
     
      student_id: 6,
      modality_id: 1,
      project_name: 'Sistema de Gestión de Biblioteca Digital',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-1',
      tutor_letter: true,
      tutor_id: 2, // Alexis Marechal
      tutor_approval: true,
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: true,
      reviewer_id: 21, // Emma Silva
      reviewer_approval: false,
      stage_id: 2 // Tutor
    },
    {
     
        student_id: 14, //nicolas gutierraz
        modality_id: 1,
        project_name: 'Sistema de Gestión de Biblioteca Digital',
        seminar_enrollment: false,
        date_seminar_enrollment: knex.fn.now(),
        period: '2025-1',
        tutor_letter: true,
        tutor_id: 21, // emma
        tutor_approval: true,
        date_tutor_assignament: knex.fn.now(),
        reviewer_letter: true,
        reviewer_id: 2, // alexis
        reviewer_approval: false,
        stage_id: 2 // Tutor
      },
    {
      
      student_id: 7, // Mariana Del Arroyo
      modality_id: 2,
      project_name: 'Plataforma de Aprendizaje Automatizado',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-2',
      tutor_letter: true,
      tutor_id: 22, // Tomás Muñoz
      tutor_approval: true,
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: false,
      reviewer_id: 21, // Emma Silva
      reviewer_approval: false,
      stage_id: 2 // Revisor
      
    },
    {
      //tesis
     
      student_id: 8, // Camilo Zuleta
      modality_id: 3,
      project_name: 'Análisis de Algoritmos de Machine Learning',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2026-1',
      tutor_letter: true,
      tutor_id: 23, // Isabela Cáceres
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: false,
      reviewer_id: 22, //tomas
      reviewer_approval: false,
      stage_id: 5 // Defensa interna
    },
    {
      student_id: 9, // María López
      modality_id: 2,
      project_name: 'Sistema de Gestión de Horarios',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2026-1',
      tutor_letter: true,
      tutor_id: 24, // Francisco Ortega
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: false,
      reviewer_id: 22, //tomas
      reviewer_approval: false,
      stage_id: 2 // Tutor
    },
    {
      student_id: 10, // Javier Martínez
      modality_id: 1,
      project_name: 'Aplicación Móvil para Registro Académico',
      seminar_enrollment: false,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-2',
      tutor_letter: false,
      tutor_id: 2, // Alexis Marechal
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: false,
      reviewer_id: 24, //francisco
      reviewer_approval: false,
      stage_id: 4 // Revisión de documentos
    },
    {
      student_id: 11, // Valentina Pérez
      modality_id: 3,
      project_name: 'Framework para Análisis de Datos Educativos',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-1',
      tutor_letter: true,
      tutor_id: 21, // Emma Silva
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: false,
      reviewer_id: 23, //isabela
      reviewer_approval: false,
      stage_id: 6 // Revisión ministerio
    },
    {
      student_id: 12, // Andrés Zamora
      modality_id: 3,
      project_name: 'Plataforma de Colaboración Estudiantil',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-2',
      tutor_letter: true,
      tutor_id: 22, // Tomás Muñoz
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: true,
      reviewer_id: 2, //alexis
      reviewer_approval: false,
      stage_id: 2 // Tutor
    },
    {
      student_id: 13, // Cristina Fernández
      modality_id: 2,
      project_name: 'Sistema de Recomendación de Cursos',
      seminar_enrollment: true,
      date_seminar_enrollment: knex.fn.now(),
      period: '2025-1',
      tutor_letter: true,
      tutor_id: 23, // Isabela Cáceres
      date_tutor_assignament: knex.fn.now(),
      reviewer_letter: true,
      reviewer_id: 22, //tomas
      reviewer_approval: true,
      stage_id: 5 // Defensa interna
    }
  ]);
};
