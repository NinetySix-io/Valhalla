import type { DroppedPosition } from '@app/components/editors/page.editor/types';
import { getMaxBBox } from '../get.max.bbox';

describe('lib::getMaxBBox', () => {
  it('calculate correctly', () => {
    const first: DroppedPosition = {
      x: 1,
      y: 5,
      width: 2,
      height: 2,
    };

    const second: DroppedPosition = {
      x: 6,
      y: 1,
      width: 2,
      height: 2,
    };

    const bbox = getMaxBBox([first, second]);
    expect(bbox.x).toBe(first.x);
    expect(bbox.y).toBe(second.y);
    expect(bbox.width).toBe(second.x + second.width - first.x);
    expect(bbox.height).toBe(first.y + first.height - second.y);
  });
});
