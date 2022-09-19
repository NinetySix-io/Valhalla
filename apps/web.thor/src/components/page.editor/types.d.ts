import type { XYCoord } from 'react-dnd';

export type BaseElement<Type extends string = string, P = unknown> = {
  type: Type;
  canResize?: boolean;
  xSpan: number;
  ySpan: number;
  props: P;
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

export type MenuElement<
  Type extends string = string,
  P = unknown,
> = BaseElement<Type, P>;

export type BoardElement<
  Type extends string = string,
  P = unknown,
> = MenuElement<Type, P> & WithId & DroppedPosition;

export type SelectionBox = {
  start: XYCoord;
  end?: XYCoord;
};

export type Size = {
  width: number;
  height: number;
};
