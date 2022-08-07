import { XYCoord } from 'react-dnd';

export function calculateElementPosition(
  coordinate: XYCoord,
  cellSize: number,
): XYCoord {
  function norm(value: number) {
    if (!value) {
      return 1;
    }

    return Math.ceil(value / cellSize) || 1;
  }

  const x = norm(coordinate.x);
  const y = norm(coordinate.y);

  return {
    x,
    y,
  };
}
