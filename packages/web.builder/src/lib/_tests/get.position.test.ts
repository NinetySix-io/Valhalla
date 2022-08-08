import { getPosition } from '../get.position';

describe('lib::getPosition', () => {
  const cellSize = 40;

  it('get min correctly', () => {
    const input = 0;
    expect(getPosition(input, cellSize)).toBe(1);
  });

  it('get correctly', () => {
    const input = cellSize * 5 + 10;
    expect(getPosition(input, cellSize)).toBe(5);
  });
});
