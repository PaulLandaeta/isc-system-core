import { suma } from '../utils/suma';

describe('Pruebas de suma', () => {
  test('La suma de 2 + 2 es 4', () => {
    expect(suma(2, 2)).toBe(4);
  });
});
