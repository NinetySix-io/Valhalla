import type { DroppedElement, Size } from '../../../types';

import type { XYCoord } from 'react-dnd';

export class Rectangle {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;

  constructor(param: Pick<Rectangle, 'left' | 'right' | 'top' | 'bottom'>) {
    this.left = param.left;
    this.right = param.right;
    this.top = param.top;
    this.bottom = param.bottom;
  }

  get width() {
    return Math.abs(this.right - this.left);
  }

  get height() {
    return Math.abs(this.bottom - this.top);
  }

  static fromSize(param: Pick<Rectangle, 'left' | 'top'> & Size) {
    return new Rectangle({
      left: param.left,
      top: param.top,
      right: param.left + param.width,
      bottom: param.top + param.height,
    });
  }

  static fromCoordinates(start: XYCoord, end: XYCoord) {
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);
    const left = end.x - start.x < 0 ? end.x : start.x;
    const top = end.y - start.y < 0 ? end.y : start.y;
    return this.fromSize({
      left,
      top,
      width,
      height,
    });
  }

  static fromHtmlElement(element: HTMLElement) {
    return new Rectangle(element.getBoundingClientRect());
  }

  static fromZoneElement(element: DroppedElement, cellSize: number) {
    const left = element.x * cellSize;
    const top = element.y * cellSize;
    const right = element.xSpan * cellSize + left;
    const bottom = element.ySpan * cellSize + top;
    return new Rectangle({
      left,
      top,
      right,
      bottom,
    });
  }

  /**
   * If this rectangle is touching another rectangle
   */
  isTouching(rectangle: Rectangle): boolean {
    if (this.left > rectangle.right || rectangle.left > this.right) {
      return false;
    } else if (this.top > rectangle.bottom || rectangle.top > this.bottom) {
      return false;
    }

    return true;
  }
}
