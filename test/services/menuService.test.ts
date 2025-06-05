import * as MenuService from '../../src/services/menuService';

jest.mock('../../src/repositories/userRepository', () => ({
  getUserById: jest.fn(),
}));
jest.mock('../../src/repositories/permissionRepository', () => ({
  getMenuItemsByRoleId: jest.fn(),
}));

const userRepo = require('../../src/repositories/userRepository');
const permRepo = require('../../src/repositories/permissionRepository');

describe('menuService.getMenuByRole', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns menu with role for existing user', async () => {
    (userRepo.getUserById as jest.Mock).mockResolvedValue({ role_id: 2, role: 'r' });
    (permRepo.getMenuItemsByRoleId as jest.Mock).mockResolvedValue(['m']);
    await expect(MenuService.getMenuByRole(1)).resolves.toEqual({ role: 'r', menu: ['m'] });
  });

  it('throws when user not found', async () => {
    (userRepo.getUserById as jest.Mock).mockResolvedValue(undefined);
    await expect(MenuService.getMenuByRole(1)).rejects.toThrow('User not found');
  });
});
