import { generateToken, verifyToken } from '../../src/utils/jwtUtility';

describe('jwtUtility', () => {
  it('generates a token that can be verified', () => {
    const token = generateToken(1, ['admin']);
    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    if (decoded) {
      expect(decoded.id).toBe(1);
      expect(decoded.roles).toContain('admin');
    }
  });

  it('returns null when token is invalid', () => {
    const result = verifyToken('invalid.token');
    expect(result).toBeNull();
  });
});
