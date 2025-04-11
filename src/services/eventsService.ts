import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../repositories/eventsRepository';
import Event from '../models/eventInterface';
import { updateHours } from './internService';
import { getEventInterns } from '../repositories/eventInternsRepository';

export const getEventsService = async () => {
  try {
    const events = await getEvents();
    //TODO: LOGIC BUSINESS
    return events;
  } catch (error) {
    console.error('Error in eventsService.getEventsService:', error);
    throw new Error('Error fetching Events');
  }
};

export const getEventsByIdService = async (id: string) => {
  try {
    const event = await getEvent(id);
    return event;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.getEventsByIdService:', error);
    throw new Error('Error fetching Event');
  }
};

export const createEventService = async (event: Event) => {
  try {
    const eventResponse = await createEvent(event);
    return eventResponse;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.createEventService:', error);
    throw new Error('Error creating Event');
  }
};

export const updateEventService = async (event: Event, id: string) => {
  try {
    const eventResponse = await updateEvent(event, id);
    return eventResponse;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.updateEventService:', error);
    throw new Error('Error updating Event');
  }
};

export const deleteEventService = async (id: string) => {
  try {
    const eventDeleted = await deleteEvent(id);
    return eventDeleted;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.deleteEventService:', error);
    throw new Error('Error deleting Event');
  }
};

export const finishEventService = async (eventId: number) => {
  try {
    const [fullEvent] = await getEventInterns(eventId);
    if (fullEvent.is_finished) {
      throw new Error('Event is already finished');
    }
    const interns = fullEvent.interns;
    for (const intern of interns) {
      await updateHours(intern.id_intern, intern.type, intern.worked_hours);
    }
    const changedEvent = await updateEvent({ is_finished: true }, eventId.toString());
    return changedEvent;
  } catch (error) {
    console.error('Error in EventInternsService.finishEventService', error);
    throw new Error('Error finishing event');
  }
};
