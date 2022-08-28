import { Rectangle } from './types';
import { Size } from '../../types';

/**
 * Given a box, return a rectangle.
 */
export function boxToRect(
  box: Size & {
    top: number;
    left: number;
  },
): Rectangle {
  return {
    left: box.left,
    top: box.top,
    right: box.left + box.width,
    bottom: box.top + box.height,
  };
}
