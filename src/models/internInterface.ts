import { Dayjs } from 'dayjs';
import User from './userInterface';

interface Intern extends User {
  id?: number;
  user_profile_id: number;
  total_hours: number;
  pending_hours: number;
  completed_hours: number;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export default Intern;
