import * as ModalityService from '../../src/services/modalityService';

jest.mock('../../src/repositories/modalityRepository', () => ({
  getModalities: jest.fn(),
}));

const repo = require('../../src/repositories/modalityRepository');

describe('modalityService.getGraduationProcessById', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns list from repository', async () => {
    (repo.getModalities as jest.Mock).mockResolvedValue(['a']);
    await expect(ModalityService.getGraduationProcessById()).resolves.toEqual(['a']);
  });

  it('propagates repository errors', async () => {
    (repo.getModalities as jest.Mock).mockRejectedValue(new Error('oops'));
    await expect(ModalityService.getGraduationProcessById()).rejects.toThrow('oops');
  });
});
