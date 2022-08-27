import { DroppedPosition } from '../../types';
import { getMaxBBox } from '../get.max.bbox';

describe('lib::getMaxBBox', () => {
  it('calculate correctly', () => {
    const first: DroppedPosition = {
      x: 1,
      y: 5,
      xSpan: 2,
      ySpan: 2,
    };

    const second: DroppedPosition = {
      x: 6,
      y: 1,
      xSpan: 2,
      ySpan: 2,
    };

    const bbox = getMaxBBox([first, second]);
    expect(bbox.x).toBe(first.x);
    expect(bbox.y).toBe(second.y);
    expect(bbox.xSpan).toBe(second.x + second.xSpan - first.x);
    expect(bbox.ySpan).toBe(first.y + first.ySpan - second.y);
  });
});
