import type { DroppedElement } from '../types';

export type Section = {
  id: string;
  children: DroppedElement[];
  config: {
    columnsCount: number;
    rowsCount: number;
  };
};
