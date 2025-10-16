import * as AdminService from '../../src/services/adminService';

jest.mock('../../src/repositories/userRepository', () => ({
  getUserByEmail: jest.fn(),
}));
jest.mock('../../src/repositories/adminRepository', () => ({
  createUser: jest.fn(),
}));
jest.mock('../../src/services/authenticationService', () => ({
  hashPassword: jest.fn(),
}));
jest.mock('../../src/config/config', () => ({ defaultUserPassword: 'p' }));
jest.mock('../../src/plugin/logger', () => ({ buildLogger: () => ({ debug: jest.fn() }) }));

const userRepo = require('../../src/repositories/userRepository');
const adminRepo = require('../../src/repositories/adminRepository');
const authSvc = require('../../src/services/authenticationService');

describe('adminService.createUserService', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates a new user when none exists', async () => {
    (userRepo.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    (authSvc.hashPassword as jest.Mock).mockResolvedValue('h');
    (adminRepo.createUser as jest.Mock).mockResolvedValue({ id: 1 });
    await expect(AdminService.createUserService({ email: 'e', name:'n', lastname:'l' } as any)).resolves.toEqual({ id:1 });
  });

  it('throws error when user exists', async () => {
    (userRepo.getUserByEmail as jest.Mock).mockResolvedValue({});
    await expect(AdminService.createUserService({} as any)).rejects.toThrow('User with this email already exists');
  });
});
