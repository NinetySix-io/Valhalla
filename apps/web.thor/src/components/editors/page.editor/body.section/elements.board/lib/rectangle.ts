import type { PageElement, Size } from '../../../types';

import type { XYCoord } from '@app/components/editors/page.editor/types';

export class Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;

  constructor(param: Pick<Rectangle, 'left' | 'right' | 'top' | 'bottom'>) {
    this.left = param.left;
    this.right = param.right;
    this.top = param.top;
    this.bottom = param.bottom;
  }

  expand(amount: number) {
    this.expandHorizontally(amount);
    this.expandVertically(amount);
    return this;
  }

  expandHorizontally(amount: number) {
    this.left -= amount;
    this.right += amount;
    return this;
  }

  expandVertically(amount: number) {
    this.bottom += amount;
    this.top -= amount;
    return this;
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

  static fromPageElement(element: PageElement) {
    const left = element.desktop.x;
    const top = element.desktop.y;
    const right = element.desktop.width + left;
    const bottom = element.desktop.height + top;

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
