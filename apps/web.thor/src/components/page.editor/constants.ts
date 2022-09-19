import type { MenuElement } from './types';
import uniqueId from 'lodash.uniqueid';

export enum ScreenSize {
  DESKTOP = 1200,
  MOBILE = 400,
  TABLET = 820,
}

export const TEMP_ITEM = uniqueId('TEMP');

//TODO: move this server side
export const SCREEN_SIZE_CONFIG = {
  [ScreenSize.DESKTOP]: {
    columns: 24,
  },
  [ScreenSize.TABLET]: {
    columns: 16,
  },
  [ScreenSize.MOBILE]: {
    columns: 8,
  },
} as const;

export const TEXT_ELEMENT: MenuElement = {
  type: 'Text',
  xSpan: 3,
  ySpan: 1,
};

export const BUTTON_ELEMENT: MenuElement = {
  type: 'Button',
  xSpan: 3,
  ySpan: 1,
};
