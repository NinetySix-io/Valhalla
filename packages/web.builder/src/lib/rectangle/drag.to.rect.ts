import { Rectangle } from './types';
import { XYCoord } from 'react-dnd';

/**
 * It takes two points and returns a rectangle
 */
export function dragToRect(start: XYCoord, end: XYCoord): Rectangle {
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  const left = end.x - start.x < 0 ? end.x : start.x;
  const top = end.y - start.y < 0 ? end.y : start.y;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}
