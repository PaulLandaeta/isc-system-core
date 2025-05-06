import { Knex } from 'knex';

const eventTable = 'events';
const eventInternTable = 'events_interns';

export const seed = async (knex: Knex): Promise<void> => {
  await knex(eventTable).insert([
    {
      id: 1,
      responsible_intern_id: 1,
      title: 'Event 1',
      description: 'Description for event 1',
      location: 'Location 1',
      duration_hours: 2,
      max_interns: 10,
      min_interns: 5,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
    {
      id: 2,
      responsible_intern_id: 2,
      title: 'Event 2',
      description: 'Description for event 2',
      location: 'Location 2',
      duration_hours: 3,
      max_interns: 15,
      min_interns: 7,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
    {
      id: 3,
      responsible_intern_id: 3,
      title: 'Event 3',
      description: 'Description for event 3',
      location: 'Location 3',
      duration_hours: 4,
      max_interns: 20,
      min_interns: 10,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
  ]);

  await knex(eventInternTable).insert([
    {
      intern_id: 1,
      event_id: 1,
      type: 'accepted',
      worked_hours: 20,
    },
    {
      intern_id: 2,
      event_id: 2,
      type: 'pending',
      worked_hours: 20,
    },
    {
      intern_id: 3,
      event_id: 3,
      type: 'reserve',
      worked_hours: 20,
    },
  ]);
};
