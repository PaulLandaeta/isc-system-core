interface createUserRequest {
  name: string;
  lastname: string;
  mothername?: string;
  code: string;
  email: string;
  phone: string;
  role_id?: number;
}

export default createUserRequest;
