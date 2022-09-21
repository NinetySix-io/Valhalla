import { getClampPosition } from '../get.clamp.position';

describe('lib::getPosition', () => {
  const cellSize = 40;

  it('get min correctly', () => {
    const input = 0;
    expect(getClampPosition(input, cellSize)).toBe(0);
  });

  it('get correctly', () => {
    const input = cellSize * 5 + 10;
    expect(getClampPosition(input, cellSize)).toBe(5);
  });
});
