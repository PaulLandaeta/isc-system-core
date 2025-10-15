import * as UserService from '../../src/services/userService';

jest.mock('../../src/repositories/userRepository', () => ({
  getUserByEmail: jest.fn(),
  getUserByCode: jest.fn(),
  createUser: jest.fn(),
  getProfessors: jest.fn(),
  getUserByRol: jest.fn(),
  getProfessorById: jest.fn(),
}));
jest.mock('../../src/services/authenticationService', () => ({
  hashPassword: jest.fn(),
}));
jest.mock('../../src/config/config', () => ({ defaultUserPassword: 'p' }));
jest.mock('../../src/plugin/logger', () => ({ buildLogger: () => ({ debug: jest.fn(), info: jest.fn(), error: jest.fn() }) }));

const repo = require('../../src/repositories/userRepository');
const authSvc = require('../../src/services/authenticationService');

describe('userService.findByEmail', () => {
  it('calls repository', async () => {
    (repo.getUserByEmail as jest.Mock).mockResolvedValue('u');
    await expect(UserService.findByEmail('e')).resolves.toBe('u');
  });
});

describe('userService.createUser', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates when email and code unique', async () => {
    (repo.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    (repo.getUserByCode as jest.Mock).mockResolvedValue(undefined);
    (authSvc.hashPassword as jest.Mock).mockResolvedValue('h');
    (repo.createUser as jest.Mock).mockResolvedValue({ id:1 });
    await expect(UserService.createUser({ code:'c', lastname:'l', email:'e' } as any)).resolves.toEqual({ id:1 });
  });

  it('throws when email exists', async () => {
    (repo.getUserByEmail as jest.Mock).mockResolvedValue({});
    await expect(UserService.createUser({} as any)).rejects.toThrow('User with this email already exists');
  });
});

describe('userService.getProfessors', () => {
  it('returns professors', async () => {
    (repo.getProfessors as jest.Mock).mockResolvedValue(['p']);
    await expect(UserService.getProfessors()).resolves.toEqual(['p']);
  });
});

describe('userService.getUserByRol', () => {
  it('returns users by role', async () => {
    (repo.getUserByRol as jest.Mock).mockResolvedValue(['u']);
    await expect(UserService.getUserByRol(1)).resolves.toEqual(['u']);
  });
});

describe('userService.getProfessorById', () => {
  it('returns professor when found', async () => {
    (repo.getProfessorById as jest.Mock).mockResolvedValue('prof');
    await expect(UserService.getProfessorById('1')).resolves.toBe('prof');
  });

  it('throws when not found', async () => {
    (repo.getProfessorById as jest.Mock).mockResolvedValue(undefined);
    await expect(UserService.getProfessorById('1')).rejects.toThrow('No professor found');
  });
});
