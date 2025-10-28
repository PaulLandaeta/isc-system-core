import { MenuResponse } from '../types/menuTypes';
interface UserResponse {
  id: number;
  username: string;
  name: string;
  lastname: string;
  mothername?: string;
  password?: string;
  email: string;
  token: string;
  role_id: number;
  menu?: MenuResponse;
}

export default UserResponse;
