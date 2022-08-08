import { BuilderElement } from './elements';
import { ValueOf } from '@valhalla/utilities';

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

export type DroppedElement<T extends Droppable = Droppable> = T & {
  id: string;
  x: number;
  y: number;
};

export type DropCandidate<T extends Droppable = Droppable> = T;
