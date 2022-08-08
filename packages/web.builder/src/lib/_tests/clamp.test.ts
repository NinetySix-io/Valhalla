import { clamp } from '../clamp';

describe('lib::clamp', () => {
  const cellSize = 40;

  it('clamp Left', () => {
    expect(clamp(30, cellSize)).toBe(40);
    expect(clamp(4 * cellSize - 10, cellSize)).toBe(4 * cellSize);
  });

  it('clamp Right', () => {
    expect(clamp(50, cellSize)).toBe(40);
    expect(clamp(4 * cellSize + 10, cellSize)).toBe(4 * cellSize);
  });
});
