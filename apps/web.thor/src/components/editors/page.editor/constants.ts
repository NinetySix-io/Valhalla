import type { MenuElement } from './types';

export enum ScreenSize {
  DESKTOP = 1200,
  MOBILE = 400,
  TABLET = 820,
}

export const MENU_ITEM = 'MENU_ITEM';

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

export const TEXT_ELEMENT: MenuElement<'Text', { value: string }> = {
  type: 'Text',
  xSpan: 3,
  ySpan: 1,
  props: {
    value: '<span>Text</span>',
  },
};

export const BUTTON_ELEMENT: MenuElement = {
  type: 'Button',
  xSpan: 3,
  ySpan: 1,
};
