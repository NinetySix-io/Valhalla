import type { Rectangle } from './types';

export function isTouching(rect1: Rectangle, rect2: Rectangle) {
  if (rect1.left > rect2.right || rect2.left > rect1.right) {
    return false;
  } else if (rect1.top > rect2.bottom || rect2.top > rect1.bottom) {
    return false;
  }

  return true;
}
