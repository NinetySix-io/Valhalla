import type { Position } from '@app/components/editors/page.editor/types';

export function getGridArea(position: Position) {
  return (
    [
      position.y,
      position.x,
      position.y + position.height,
      position.x + position.width,
    ]
      // grid starts at index 1, not 0
      .map((pos) => pos + 1)
      .join(' / ')
  );
}
