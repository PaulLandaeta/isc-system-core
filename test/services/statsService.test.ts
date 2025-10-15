import * as StatsService from '../../src/services/statsService';

jest.mock('../../src/repositories/statsRepository', () => ({
  getStats: jest.fn(),
}));

const repo = require('../../src/repositories/statsRepository');

describe('statsService.getStats', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns data from repository', async () => {
    (repo.getStats as jest.Mock).mockResolvedValue({ count: 1 });
    await expect(StatsService.getStats()).resolves.toEqual({ count: 1 });
  });

  it('propagates repository errors', async () => {
    (repo.getStats as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(StatsService.getStats()).rejects.toThrow('fail');
  });
});
