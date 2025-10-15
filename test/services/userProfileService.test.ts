import * as UserProfileService from '../../src/services/userProfileService';

jest.mock('../../src/repositories/userProfileRepository', () => ({
  createUserProfile: jest.fn(),
  deleteUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUsers: jest.fn(),
  updateUserProfile: jest.fn(),
  updateUserProfileRole: jest.fn(),
}));
jest.mock('../../src/repositories/userRolesRepository', () => ({
  assignUserRole: jest.fn(),
  deleteUserRole: jest.fn(),
}));
jest.mock('../../src/interactors/permissionsInteractor', () => ({
  getRolesAndPermissions: jest.fn(),
}));
jest.mock('../../src/services/authenticationService', () => ({ hashPassword: jest.fn() }));
jest.mock('../../src/config/config', () => ({ defaultUserPassword: 'p' }));
jest.mock('../../src/plugin/logger', () => ({ buildLogger: () => ({ info: jest.fn(), debug: jest.fn(), error: jest.fn() }) }));

const profileRepo = require('../../src/repositories/userProfileRepository');
const permInteractor = require('../../src/interactors/permissionsInteractor');
const authSvc = require('../../src/services/authenticationService');

describe('userProfileService.createUserProfile', () => {
  it('creates user profile with hashed password', async () => {
    (authSvc.hashPassword as jest.Mock).mockResolvedValue('h');
    (profileRepo.createUserProfile as jest.Mock).mockResolvedValue({ id:1 });
    await expect(UserProfileService.createUserProfile({ name:'n', lastname:'l', mothername:'m', code:'c', email:'e', phone:'p', isStudent:true } as any)).resolves.toEqual({ id:1 });
  });
});

describe('userProfileService.getUser', () => {
  it('returns user with permissions', async () => {
    (profileRepo.getUserById as jest.Mock).mockResolvedValue({ id:1 });
    (permInteractor.getRolesAndPermissions as jest.Mock).mockResolvedValue('rp');
    await expect(UserProfileService.getUser('1')).resolves.toEqual({ id:1, rolesAndPermissions:'rp' });
  });

  it('throws when not found', async () => {
    (profileRepo.getUserById as jest.Mock).mockResolvedValue(null);
    await expect(UserProfileService.getUser('2')).rejects.toThrow('User not found with such id 2');
  });
});
