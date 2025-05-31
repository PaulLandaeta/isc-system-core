import * as UserService from '../services/userService';
import * as AuthenticationService from '../services/authenticationService';
import { generateToken } from '../utils/jwtUtility';
import { AuthenticationError } from '../errors/authenticationError';

import { login } from './loginInteractor';

jest.mock('../services/userService');
jest.mock('../services/authenticationService');
jest.mock('../utils/jwtUtility', () => ({
  generateToken: jest.fn(),
}));
jest.mock('../plugin/logger', () => ({
  buildLogger: () => ({
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}));

const mockUser = {
  id: 1,
  username: 'testuser',
  name: 'Test',
  lastname: 'User',
  password: 'hashed',
  email: 'test@example.com',
  code: '1',
  phone: '123456',
  roles: ['admin'],
};

describe('loginInteractor.login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns user data with token when credentials are valid', async () => {
    (UserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (AuthenticationService.verifyPassword as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('token123');

    const result = await login('test@example.com', 'password');

    expect(result).toEqual({
      ...mockUser,
      token: 'token123',
      password: undefined,
    });
  });

  it('throws AuthenticationError when user is not found', async () => {
    (UserService.findByEmail as jest.Mock).mockResolvedValue(undefined);

    await expect(login('none@example.com', 'password')).rejects.toThrow(AuthenticationError);
  });

  it('throws AuthenticationError when password is invalid', async () => {
    (UserService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (AuthenticationService.verifyPassword as jest.Mock).mockResolvedValue(false);

    await expect(login('test@example.com', 'wrong')).rejects.toThrow(AuthenticationError);
  });
});
