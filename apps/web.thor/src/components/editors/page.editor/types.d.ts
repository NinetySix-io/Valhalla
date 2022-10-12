import type { ElementText } from '@app/generated/valhalla.gql';
import type { Mutable, OmitRecursively } from '@valhalla/utilities';

export type XYCoord = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Position = Size & XYCoord;

export type PageElement = Mutable<OmitRecursively<ElementText, '__typename'>>;
