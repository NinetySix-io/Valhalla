import { clampCell } from '../clamp';

describe('lib::clampCell', () => {
  const cellSize = 40;

  it('clamp Left', () => {
    expect(clampCell(30, cellSize)).toBe(40);
    expect(clampCell(4 * cellSize - 10, cellSize)).toBe(4 * cellSize);
  });

  it('clamp Right', () => {
    expect(clampCell(50, cellSize)).toBe(40);
    expect(clampCell(4 * cellSize + 10, cellSize)).toBe(4 * cellSize);
  });
});
