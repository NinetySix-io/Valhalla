import { BuilderElement } from './elements';
import { ValueOf } from '@valhalla/utilities';

export type DroppableElement = ValueOf<BuilderElement>;

export type Droppable<T extends DroppableElement = DroppableElement> = T & {
  widthPct: number;
  heightPct: number;
  canResize?: boolean;
};

export type DroppedItem<T extends Droppable = Droppable> = T & {
  id: string;
  topLeftX: number;
  topLeftY: number;
};

export type DropCandidate<T extends Droppable = Droppable> = T;
