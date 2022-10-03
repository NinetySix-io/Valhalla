import type { DroppedElement } from '../types';

export type Section = {
  id: string;
  children: DroppedElement[];
  config: {
    rowsCount: number;
    columnGap: number;
    rowGap: number;
  };
};
