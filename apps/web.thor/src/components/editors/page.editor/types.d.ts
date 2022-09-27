import type { ElementType } from '@app/generated/valhalla.gql';

export type XYCoord = {
  x: number;
  y: number;
};

export type BaseElement<Type extends string = string, P = unknown> = {
  type: Type;
  canResize?: boolean;
  xSpan: number;
  ySpan: number;
  props?: P;
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

export type BoardElement<
  Type extends string = string,
  P = unknown,
> = BaseElement<Type, P> & WithId & DroppedPosition;

export type TextElement = BoardElement<
  ElementType.TEXT,
  { json: JSONContent; html: HTMLContent }
>;

export type Size = {
  width: number;
  height: number;
};
