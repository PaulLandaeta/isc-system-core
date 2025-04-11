import EventInterns from '../models/eventsInternsInterface';
import {
  getEventInterns,
  registerInternProcess,
  updateInternType,
  deleteInternRegistration,
  updateStatusForEventInterns,
  updateInternAttendance,
  getEventInternsByTwoId,
  getEventInformation,
  updateEventInternsRepository,
} from '../repositories/eventInternsRepository';
import { getEventsByIdService } from './eventsService';

export const getEventIntern = async (eventId: number) => {
  try {
    const [listEventInterns] = await getEventInterns(eventId);
    if (!listEventInterns) {
      return [];
    }

    const acceptedInterns = listEventInterns?.interns.filter(
      (intern: any) => intern.type === 'accepted'
    );
    const pendingInterns = listEventInterns?.interns.filter(
      (intern: any) => intern.type === 'pending'
    );
    const reserveInterns = listEventInterns?.interns.filter(
      (intern: any) => intern.type === 'reserve'
    );
    const rejectedInterns = listEventInterns?.interns.filter(
      (intern: any) => intern.type === 'rejected'
    );

    pendingInterns.sort((a: any, b: any) => {
      if (a.pending_hours !== b.pending_hours) {
        return b.pending_hours - a.pending_hours;
      } else {
        return new Date(a.registration_date).getTime() - new Date(b.registration_date).getTime();
      }
    });

    const sortedList = [
      ...acceptedInterns,
      ...pendingInterns,
      ...reserveInterns,
      ...rejectedInterns,
    ];

    return {
      ...listEventInterns,
      interns: sortedList,
    };
  } catch (error) {
    console.error('Error in EventInternsService.getEventIntern', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const getEventsInternById = async (eventId: number, internId: number) => {
  try {
    const listEventInterns = await getEventInternsByTwoId(eventId, internId);
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsService.getEventIntern', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const registerIntern = async (eventId: number, internId: number) => {
  try {
    const { assigned_hours } = await getEventsByIdService(eventId.toString());
    const registerInterns = await registerInternProcess(eventId, internId, assigned_hours);
    return registerInterns;
  } catch (error) {
    console.error('Error in EventInternsService.registerInternProcess', error);
    throw new Error('Error fetching RegisterIntern');
  }
};

export const updateInternsType = async (id_evento: number, id_becario: number, status: string) => {
  try {
    const updateInternsType = await updateInternType(id_evento, id_becario, status);
    return updateInternsType;
  } catch (error) {
    console.error('Error in EventInternsService.updateInternsType', error);
    throw new Error('Error fetching Update Interns Type');
  }
};

export const cancelInternRegistration = async (id_evento: number, id_becario: number) => {
  try {
    const cancelRegistration = await deleteInternRegistration(id_evento, id_becario);
    return cancelRegistration;
  } catch (error) {
    console.error('Error in EventInternsService.deleteInternRegistration', error);
    throw new Error('Error fetching Cancel Registration');
  }
};

export const updateEventHistory = async (id_evento: number) => {
  try {
    const updatedRows = await updateStatusForEventInterns(
      id_evento,
      ['pending', 'reserve'],
      'rejected'
    );
    return updatedRows;
  } catch (error) {
    console.error('Error in EventInternsService.updateEventHistory', error);
    throw new Error('Error fetching Update Event History');
  }
};

export const updateInternsAttendance = async (
  id_evento: number,
  id_becario: number,
  new_status: boolean
) => {
  try {
    const updatedAttendance = await updateInternAttendance(id_evento, id_becario, new_status);
    return updatedAttendance;
  } catch (error) {
    console.error('Error in EventInternsService.updateInternsAttendance', error);
    throw new Error('Error updating Update Interns Attendance');
  }
};

export const getEventInformations = async () => {
  try {
    const listEventInterns = await getEventInformation();
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsService.getEventIntern', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const updateEventInternService = async (
  eventId: number,
  internId: number,
  eventIntern: EventInterns
) => {
  try {
    const updatedRow = await updateEventInternsRepository(eventId, internId, eventIntern);
    return updatedRow;
  } catch (error) {
    console.error('Error in EventInternsService.updateEventInternService', error);
    throw new Error('Error updating EventIntern');
  }
};
