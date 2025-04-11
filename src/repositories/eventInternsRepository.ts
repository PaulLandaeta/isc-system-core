import EventInterns from '../models/eventsInternsInterface';
import db from './pg-connection';

const tableName = 'events_interns';

export const getEventInterns = async (eventId: number) => {
  try {
    const listEventInterns = await db('events as e')
      .leftJoin(`${tableName} as ei`, 'ei.event_id', 'e.id')
      .leftJoin('interns as i', 'ei.intern_id', 'i.id')
      .leftJoin('user_profile as up', 'i.user_profile_id', 'up.id')
      .select(
        'e.id as id_events',
        'e.*',
        db.raw(`array_agg(json_build_object(
          'id_intern', "i"."id",
          'name', "up"."name",
          'lastname', "up"."lastname",
          'mothername', "up"."mothername",
          'code', "up"."code",
          'type', "ei"."type",
          'worked_hours', "ei"."worked_hours",
          'notes', "ei"."notes",
          'attendance', "ei"."attendance",
          'total_hours', "i"."total_hours",
          'pending_hours', "i"."pending_hours",
          'completed_hours', "i"."completed_hours",
          'registration_date', "ei"."created_at",
          'last_update', "ei"."updated_at"
        )) as interns`)
      )
      .where('e.id', eventId)
      .groupBy('e.id');
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInterns', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const getEventInformation = async () => {
  try {
    const listEventInterns = await db(`${tableName} as ei`)
      .rightJoin('events as e', 'ei.event_id', 'e.id')
      .leftJoin('interns as i', 'ei.intern_id', 'i.id')
      .select(
        'e.*',
        db.raw(`COUNT(CASE WHEN ei.type = 'accepted' THEN 1 END) as accepted_interns`),
        db.raw(`COUNT(CASE WHEN ei.type = 'pending' THEN 1 END) as pending_interns`)
      )
      .groupBy('e.id');

    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInformation', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const getEventInternsByTwoId = async (eventId: number, internId: number) => {
  try {
    const listEventInterns = await db(tableName)
      .where({
        event_id: eventId,
        intern_id: internId,
      })
      .first();
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInternsByTwoId', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const registerInternProcess = async (
  eventId: number,
  internId: number,
  assigned_hours: number
) => {
  try {
    const registerInterns = await db(tableName)
      .insert({
        event_id: eventId,
        intern_id: internId,
        type: 'pending',
        worked_hours: assigned_hours,
      })
      .returning('*');
    return registerInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.registerInternProcess', error);
    throw new Error('Error fetching RegisterInterns');
  }
};

export const updateInternType = async (eventId: number, internId: number, status: string) => {
  try {
    const result = await db(tableName)
      .where({
        intern_id: internId,
        event_id: eventId,
      })
      .update({
        type: status,
        updated_at: new Date(),
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in EventInternsRepository.updateInternStatus', error);
    throw new Error('Error updating Intern status');
  }
};

export const deleteInternRegistration = async (eventId: number, internId: number) => {
  try {
    const result = await db(tableName)
      .where({
        event_id: eventId,
        intern_id: internId,
      })
      .del()
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in EventInternsRepository.deleteInternRegistration', error);
    throw new Error('Error deleting Intern registration');
  }
};

export const updateStatusForEventInterns = async (
  eventId: number,
  currentStatuses: string[],
  newStatus: string
) => {
  try {
    const result = await db(tableName)
      .where('event_id', eventId)
      .whereIn('type', currentStatuses)
      .update({
        type: newStatus,
        updated_at: new Date(),
      })
      .returning('*');

    return result;
  } catch (error) {
    console.error('Error in updateStatusForEventInterns', error);
    throw new Error('Error updating status for Event Interns');
  }
};

export const updateInternAttendance = async (
  id_evento: number,
  id_becario: number,
  new_status: boolean
) => {
  try {
    const result = await db(tableName)
      .where({
        event_id: id_evento,
        intern_id: id_becario,
      })
      .update({
        attendance: new_status,
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in updateInternAttendance', error);
    throw new Error('Error updating attendance status for Interns');
  }
};

// TODO: refactor all update controllers to use this one
export const updateEventInternsRepository = async (
  eventId: number,
  internId: number,
  eventIntern: EventInterns
) => {
  try {
    const eventResponse = await db(tableName)
      .where('event_id', eventId)
      .where('intern_id', internId)
      .update({...eventIntern, updated_at: new Date()})
      .returning('*');
    return eventResponse;
  } catch (error) {
    console.error('Error in eventInternsRepository.updateEventInterns:', error);
    throw new Error('Error updating EventIntern');
  }
};