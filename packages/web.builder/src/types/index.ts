import type { BuilderElement } from './elements';
import type { ValueOf } from '@valhalla/utilities';

export type DroppableElement = ValueOf<BuilderElement>;

export type Size = {
  width: number;
  height: number;
};

export type Droppable<T extends DroppableElement = DroppableElement> = T & {
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

export type DropCandidate<T extends Droppable = Droppable> = T;
