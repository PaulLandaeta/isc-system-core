import { Dayjs } from 'dayjs';

interface EventInterns {
  id_intern: number;
  id_event: number;
  worked_hours: number;
  type: string;
  attendance: boolean;
  notes: string;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export default EventInterns;
