import { DefenseDetail } from '../models/defenseDetailInterface';
import GraduationProcess from '../models/graduationProcessInterface';
import { NotFoundError } from '../errors/notFoundError'; // Ajusta la ruta según tu estructura
import db from './pg-connection';

const tableName = 'graduation_process';

export const getGraduationProcessById = async (id: number) => {
  try {
    const graduationProcess = await db(`${tableName} as gp`)
      .join('students as st', 'gp.student_id', 'st.id')
      .join('user_profile as student', 'st.id', 'student.id')
      .leftJoin('professors as pt', 'gp.tutor_id', 'pt.id')
      .leftJoin('user_profile as tutor', 'pt.id', 'tutor.id')
      .leftJoin('professors as pr', 'gp.reviewer_id', 'pr.id')
      .leftJoin('user_profile as reviewer', 'pr.id', 'reviewer.id')
      .join('modalities', 'gp.modality_id', 'modalities.id')
      .select(
        db.raw(
          "CONCAT(student.name, ' ', student.lastname, ' ', student.mothername) as student_fullname"
        ),
        db.raw("CONCAT(tutor.name, ' ', tutor.lastname, ' ', tutor.mothername) as tutor_fullname"),
        db.raw(
          "CONCAT(reviewer.name, ' ', reviewer.lastname, ' ', reviewer.mothername) as reviewer_fullname"
        ),
        'student.name as student_name',
        'tutor.name as tutor_name',
        'pt.degree as tutor_degree',
        'reviewer.name as reviewer_name',
        'pr.degree as reviewer_degree',
        'modalities.name as modality_name',
        'gp.*'
      )
      .where('gp.id', id)
      .first();
    return graduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getGraduationProcessById:', error);
    throw new Error('Error fetching Graduation Process');
  }
};

export const updateGraduationProcess = async (
  id: number,
  updatedData: Partial<GraduationProcess>
) => {
  try {
    const updatedRows = await db(tableName).where({ id }).update(updatedData);
    if (updatedRows === 0) {
      throw new Error('Graduation process not found or no change made');
    }
    return await db(tableName).where({ id }).first();
  } catch (error) {
    console.error('Error in GraduationProcessRepository.updateGraduationProcess:', error);
    throw new Error('Error updating Graduation Process');
  }
};

export const createGraduationProcess = async (data: GraduationProcess) => {
  try {
    const [newGraduationProcess] = await db(tableName).insert(data).returning('*');
    return newGraduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.createGraduationProcess:', error);
    throw new Error('Error creating Graduation Process');
  }
};

export const getGraduationProcesses = async () => {
  try {
    const students = await db('graduation_process as gp')
      .select(
        'u.name as student_name',
        'm.name as modality',
        'tutor.name as tutor_name',
        'reviewer.name as reviewer_name',
        'gp.period as period',
        'gp.id'
      )
      .join('user_profile as u', 'u.id', '=', 'gp.student_id')
      .join('modalities as m', 'm.id', '=', 'gp.modality_id')
      .leftJoin('user_profile as tutor', 'tutor.id', '=', 'gp.tutor_id')
      .leftJoin('user_profile as reviewer', 'reviewer.id', '=', 'gp.reviewer_id');
    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDefense = async (processId: number, defenseData: DefenseDetail) => {
  try {
    const defense = await db('defense_details as dd')
      .insert({ ...defenseData, graduation_process_id: processId })
      .returning('*');
    return defense;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.createDefense:', error);
    throw new Error('Error creating defense');
  }
};

export const updateDefense = async (defenseId: number, updatedData: Partial<DefenseDetail>) => {
  try {
    const updatedRows = await db('defense_details')
      .where({ id: defenseId })
      .update(updatedData);
      
    if (updatedRows === 0) {
      throw new NotFoundError('Defense not found');
    }
    
    return await getDefenseById(defenseId); 
  } catch (error) {
    console.error('Error in GraduationProcessRepository.updateDefense:', error);
    throw error; // para que el interactor lo maneje
  }
};
export const getDefenseById = async (defenseId: number) => {
  try {
    const defense = await db('defense_details')
      .where({ id: defenseId })
      .first();
    return defense;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getDefenseById:', error);
    throw new Error('Error fetching defense by ID');
  }
};

export const getDefense = async (processId: number, type: string) => {
  try {
    const defense = await db('defense_details')
      .where({ graduation_process_id: processId, type: type })
      .first();
    return defense;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getDefense:', error);
    throw new Error('Error fetching defense');
  }
};
