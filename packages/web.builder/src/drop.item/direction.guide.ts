import { DIRECTION } from './directions';

export function isPointingLeft(
  direction: DIRECTION,
): direction is DIRECTION.LEFT | DIRECTION.BOTTOM_LEFT | DIRECTION.TOP_LEFT {
  return (
    direction === DIRECTION.LEFT ||
    direction === DIRECTION.TOP_LEFT ||
    direction === DIRECTION.BOTTOM_LEFT
  );
}

export function isPointingRight(
  direction: DIRECTION,
): direction is DIRECTION.RIGHT | DIRECTION.TOP_RIGHT | DIRECTION.BOTTOM_RIGHT {
  return (
    direction === DIRECTION.RIGHT ||
    direction === DIRECTION.TOP_RIGHT ||
    direction === DIRECTION.BOTTOM_RIGHT
  );
}

export function isPointingUp(
  direction: DIRECTION,
): direction is DIRECTION.TOP | DIRECTION.TOP_LEFT | DIRECTION.TOP_RIGHT {
  return (
    direction === DIRECTION.TOP ||
    direction === DIRECTION.TOP_LEFT ||
    direction === DIRECTION.TOP_RIGHT
  );
}

export function isPointingDown(
  direction: DIRECTION,
): direction is
  | DIRECTION.BOTTOM
  | DIRECTION.BOTTOM_LEFT
  | DIRECTION.BOTTOM_RIGHT {
  return (
    direction === DIRECTION.BOTTOM ||
    direction === DIRECTION.BOTTOM_LEFT ||
    direction === DIRECTION.BOTTOM_RIGHT
  );
}
