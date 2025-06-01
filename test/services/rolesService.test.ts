import * as RolesService from '../../src/services/rolesService';

jest.mock('../../src/repositories/rolesRepository', () => ({
  getRoles: jest.fn(),
  createRol: jest.fn(),
  editRol: jest.fn(),
  disableRol: jest.fn(),
  addPermission: jest.fn(),
  removePermission: jest.fn(),
  getRolesProfessor: jest.fn(),
  getRolesStudent: jest.fn(),
}));

const repo = require('../../src/repositories/rolesRepository');

describe('rolesService.getRoles', () => {
  afterEach(() => jest.clearAllMocks());

  it('filters roles by name and disabled status', async () => {
    (repo.getRoles as jest.Mock).mockResolvedValue({
      Admin: { id:1, disabled:false, permissions:{ page:['p'], actions:[] } },
      Guest: { id:2, disabled:true },
    });
    await expect(RolesService.getRoles('Adm')).resolves.toEqual({
      Admin: { id:1, disabled:false, permissions:{ page:['p'], actions:[] } },
    });
  });
});

describe('rolesService.createRol', () => {
  afterEach(() => jest.clearAllMocks());

  it('creates role when name unique', async () => {
    (repo.getRoles as jest.Mock).mockResolvedValue({});
    (repo.createRol as jest.Mock).mockResolvedValue([{ id:3 }]);
    await expect(RolesService.createRol({ name:'New' } as any)).resolves.toEqual({ id:3 });
  });

  it('throws when name exists', async () => {
    (repo.getRoles as jest.Mock).mockResolvedValue({ Existing:{ id:1, disabled:false } });
    await expect(RolesService.createRol({ name:'Existing' } as any)).rejects.toThrow('there is another Rol with the same name');
  });
});

describe('rolesService.disableRol', () => {
  it('returns repository result', async () => {
    (repo.disableRol as jest.Mock).mockResolvedValue('ok');
    await expect(RolesService.disableRol(1)).resolves.toBe('ok');
  });
});
