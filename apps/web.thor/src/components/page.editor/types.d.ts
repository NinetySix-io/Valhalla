import type { XYCoord } from 'react-dnd';

export type BaseElement<Type extends string = string> = {
  type: Type;
  canResize?: boolean;
  xSpan: number;
  ySpan: number;
};

export type DroppedPosition = {
  x: number;
  y: number;
  xSpan: number;
  ySpan: number;
};

type WithId = {
  id: string;
};

export type DroppedElement<E extends BaseElement = BaseElement> = E &
  DroppedPosition &
  WithId;

export type MenuElement = BaseElement;
export type BoardElement = MenuElement & WithId & DroppedPosition;

export type SelectionBox = {
  start: XYCoord;
  end?: XYCoord;
};

export type Size = {
  width: number;
  height: number;
};
