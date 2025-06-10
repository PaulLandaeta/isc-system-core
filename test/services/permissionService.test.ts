import * as PermissionService from '../../src/services/permissionService';

jest.mock('../../src/repositories/permissionRepository', () => ({
  getRoleAndPermissions: jest.fn(),
  getPermissions: jest.fn(),
  getPermissionByID: jest.fn(),
}));

const repo = require('../../src/repositories/permissionRepository');

describe('permissionService.getUserRolesAndPermissions', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns null when repository returns empty', async () => {
    (repo.getRoleAndPermissions as jest.Mock).mockResolvedValue({});
    await expect(PermissionService.getUserRolesAndPermissions(1)).resolves.toBeNull();
  });

  it('returns data when available', async () => {
    (repo.getRoleAndPermissions as jest.Mock).mockResolvedValue({ id: 1 });
    await expect(PermissionService.getUserRolesAndPermissions(1)).resolves.toEqual({ id: 1 });
  });
});

describe('permissionService.getPermissions', () => {
  it('forwards repository result', async () => {
    (repo.getPermissions as jest.Mock).mockResolvedValue(['p']);
    await expect(PermissionService.getPermissions()).resolves.toEqual(['p']);
  });
});

describe('permissionService.getPermissionByID', () => {
  it('forwards repository result', async () => {
    (repo.getPermissionByID as jest.Mock).mockResolvedValue('perm');
    await expect(PermissionService.getPermissionByID(1)).resolves.toBe('perm');
  });
});
