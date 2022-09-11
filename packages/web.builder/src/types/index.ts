export type Size = {
  width: number;
  height: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Droppable<
  T extends object = object,
  Type extends string = string,
> = T & {
  type: Type;
  xSpan: number;
  ySpan: number;
  canResize?: boolean;
};

export type DroppedPosition = {
  xSpan: number;
  ySpan: number;
  x: number;
  y: number;
};

export type DroppedElement<T extends Droppable = Droppable> = T &
  DroppedPosition & {
    id: string;
  };

export type AddedElement<T extends Droppable = Droppable> = T & DroppedPosition;
export type DropCandidate<T extends Droppable = Droppable> = T;
