import * as UserRoleService from '../../src/services/userRoleService';

jest.mock('../../src/repositories/userRolesRepository', () => ({
  assignUserRole: jest.fn(),
  deleteUserRole: jest.fn(),
}));
jest.mock('../../src/plugin/logger', () => ({ buildLogger: () => ({ debug: jest.fn(), info: jest.fn(), error: jest.fn() }) }));

const repo = require('../../src/repositories/userRolesRepository');

describe('userRoleService.createUserRole', () => {
  it('delegates to repository', async () => {
    (repo.assignUserRole as jest.Mock).mockResolvedValue('ok');
    await expect(UserRoleService.createUserRole('1',2)).resolves.toBe('ok');
  });
});

describe('userRoleService.createUserRoles', () => {
  it('returns true when all assigned', async () => {
    (repo.assignUserRole as jest.Mock).mockResolvedValue('ok');
    await expect(UserRoleService.createUserRoles('1',[1,2])).resolves.toBe(true);
  });
});

describe('userRoleService.deleteUserRole', () => {
  it('calls repository', async () => {
    await UserRoleService.deleteUserRole('3');
    expect(repo.deleteUserRole).toHaveBeenCalledWith('3');
  });
});
