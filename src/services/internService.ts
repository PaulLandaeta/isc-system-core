import Intern from 'src/models/internInterface';
import {
  updateHoursInterns,
  getInternsById,
  getRecordIntern,
  getInformationIntern,
  getListIntern,
  getInternsByUserId,
  getAllDataInternsRepository,
  getSupervisor,
} from '../repositories/internsRepository';
import { createInternInteractor } from '../interactors/internInteractor';

export const updateHours = async (internId: number, type: string, duration_hours: number) => {
  try {
    if (type === 'accepted') {
      const { total_hours, pending_hours, completed_hours } = await getInternById(internId);
      var newPendingHours = pending_hours - duration_hours;
      if (newPendingHours < 0) newPendingHours = 0;
      const updateHoursIntern = await updateHoursInterns(
        internId,
        newPendingHours,
        total_hours - newPendingHours
      );
      return updateHoursIntern;
    }
  } catch (error) {
    console.error('Error in InternsService.updateHours', error);
    throw new Error('Error fetching Update Hours Intern');
  }
};

export const getInternByUserId = async (userId: number) => {
  try {
    const intern = await getInternsByUserId(userId);
    return intern;
  } catch (error) {
    console.error('Error in InternsService.getInternById:', error);
    throw new Error('Error fetching Interns');
  }
};
export const getInternById = async (internId: number) => {
  try {
    const event = await getInternsById(internId);
    return event;
  } catch (error) {
    console.error('Error in InternsService.getInternById:', error);
    throw new Error('Error fetching Interns');
  }
};

export const getRecordInterns = async (internId: number) => {
  try {
    const events = await getRecordIntern(internId);

    const acceptedEvents = events.filter(event => event.type === 'accepted');
    const rejectedEvents = events.filter(event => event.type === 'rejected');
    const listHistory = [...acceptedEvents, ...rejectedEvents];

    const groupedEvents = listHistory.reduce((acc, event) => {
      const eventDate = new Date(event.start_date);
      const monthYear = eventDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(event);

      return acc;
    }, {});

    return groupedEvents;
  } catch (error) {
    console.error('Error in InternsService.getRecordInterns:', error);
    throw new Error('Error fetching Interns');
  }
};

export const getInformationsIntern = async (internId: number) => {
  try {
    const infoIntern = await getInformationIntern(internId);
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsService.getRecordInterns:', error);
    throw new Error('Error fetching Interns');
  }
};

export const getMyEventsInternService = async (internId: number) => {
  try {
    const events = await getRecordIntern(internId);
    return events;
  } catch (error) {
    console.error('Error in InternsService.getRecordInterns:', error);
    throw new Error('Error fetching Interns');
  }
};

export const getListInterns = async () => {
  try {
    const listInterns = await getListIntern();
    return listInterns;
  } catch (error) {
    console.error('Error in InternsService.getRecordInterns:', error);
    throw new Error('Error fetching Interns');
  }
};

export const getAllDataInternsService = async () => {
  try {
    const eventComplete = await getSupervisor();
    const interns = await getAllDataInternsRepository();

    const unionEventIntern = [...eventComplete,...interns]

    const groupedInterns = unionEventIntern.reduce((acc, item) => {
      const {id, id_intern, responsible_intern_id, name, lastname, mothername } = item;

      if (!acc[id_intern]) {
        acc[id_intern] = {  
          id: id_intern,
          name: name,
          lastname: lastname,
          mothername: mothername,
          full_name: `${name} ${lastname} ${mothername}`,
          code: item.code,
          user_profile_id: item.user_profile_id,
          total_hours: item.total_hours,
          pending_hours: item.pending_hours,
          completed_hours: item.completed_hours,
          events: [],
        };
      }

      const is_supervisor = responsible_intern_id == id_intern;

      acc[id_intern].events.push({
        event_id: id,
        title: item.title,
        worked_hours: item.worked_hours,
        type: item.type,
        attendance: item.attendance,
        registration_date: item.registration_date,
        last_update: item.last_update,
        notes: item.notes || '',
        is_supervisor: is_supervisor,
      });


      return acc;
    }, []);
    return Object.values(groupedInterns);

  } catch (error) {
    console.error('Error in InternsService.getAllDataInternsService:', error);
    throw new Error('Error fetching Interns');
  }
};

export const createInternService = async (intern: Intern) => {
  try {
    const newIntern = createInternInteractor(intern);
    return newIntern;
  } catch (error) {
    console.error('Error in internsService.createInternService:', error);
    throw new Error('Error creating intern');
  }
};
