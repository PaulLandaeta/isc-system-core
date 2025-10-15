import bcrypt from 'bcryptjs';

import * as AuthService from '../../src/services/authenticationService';

jest.mock('bcryptjs');

const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('authenticationService.verifyPassword', () => {
  it('compares passwords using bcrypt', async () => {
    (bcryptMock.compare as any).mockResolvedValue(true);
    await expect(AuthService.verifyPassword('a', 'b')).resolves.toBe(true);
    expect(bcryptMock.compare).toHaveBeenCalledWith('a', 'b');
  });

  it('throws when bcrypt throws', async () => {
    (bcryptMock.compare as any).mockRejectedValue(new Error('bad'));
    await expect(AuthService.verifyPassword('a', 'b')).rejects.toThrow('bad');
  });
});

describe('authenticationService.hashPassword', () => {
  it('hashes with salt', async () => {
    (bcryptMock.genSalt as any).mockResolvedValue('s');
    (bcryptMock.hash as any).mockResolvedValue('h');
    await expect(AuthService.hashPassword('p')).resolves.toBe('h');
    expect(bcryptMock.genSalt).toHaveBeenCalledWith(10);
    expect(bcryptMock.hash).toHaveBeenCalledWith('p', 's');
  });
});
