import type { PageElementTextSchema } from '@app/generated/valhalla.gql';
import type { Mutable } from '@valhalla/utilities';

export type XYCoord = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Position = Size & XYCoord;

export type PageElement = Mutable<PageElementTextSchema>;
