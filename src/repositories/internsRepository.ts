import Intern from 'src/models/internInterface';
import db from './pg-connection';

const tableName = 'interns';
export const getSupervisor = async() => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .join('events as e', 'in.id', 'e.responsible_intern_id')
      .select(
        'up.name',
        'up.lastname',
        'up.mothername',
        'up.code',
        'in.id as id_intern',
        'in.*',
        'e.id',
        'e.responsible_intern_id',
        'e.title',
      );
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getAllDataInternsRepository', error);
    throw new Error('Error fetching Interns');
  }
}
export const updateHoursInterns = async (
  internId: number,
  newHoursPending: number,
  newHoursCompleted: number
) => {
  try {
    const result = await db(tableName)
      .where({
        id: internId,
      })
      .update({
        pending_hours: newHoursPending,
        completed_hours: newHoursCompleted,
        updated_at: new Date(),
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in InternsRepository.updateHoursInterns', error);
    throw new Error('Error Update Hours Interns');
  }
};

export const getInternsByUserId = async (userId: number) => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .select('up.*', 'in.id as id_intern', 'in.*')
      .where('in.user_profile_id', userId)
      .first();
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};
export const getInternsById = async (internId: number) => {
  try {
    const event = await db(tableName).where('id', internId).first();
    return event;
  } catch (error) {
    console.error('Error in InternsRepository.getInternsById', error);
    throw new Error('Error fetching Interns');
  }
};

export const getRecordIntern = async (internId: number) => {
  try {
    const event = await db(`${tableName} as i`)
      .join('events_interns as ei', 'i.id', 'ei.intern_id')
      .join('events as e', 'e.id', 'ei.event_id')
      .select(
        'e.*',
        'ei.type',
        'ei.created_at as registration_date',
        'ei.updated_at as last_update'
      )
      .where({ 'ei.intern_id': internId });
    return event;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};

export const getInformationIntern = async (internId: number) => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .select('up.*', 'in.*')
      .where('in.id', internId)
      .first();
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};

export const getListIntern = async () => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .select('up.*', 'in.id as id_intern', 'in.*');
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};

export const getAllDataInternsRepository = async () => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .join('events_interns as ei', 'in.id', 'ei.intern_id')
      .join('events as e', 'ei.event_id', 'e.id')
      .select(
        'up.name',
        'up.lastname',
        'up.mothername',
        'up.code',
        'in.id as id_intern',
        'in.*',
        'e.id',
        'e.responsible_intern_id',
        'e.title',
      );
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getAllDataInternsRepository', error);
    throw new Error('Error fetching Interns');
  }
};

export const createInternRepo = async (intern: Intern) => {
  try {
    const internRes = await db(tableName).insert(intern).returning('*');
    return internRes;
  } catch (error) {
    console.error('Error in internsRepository.createInternRepo:', error);
    throw new Error('Error creating Intern');
  }
};
