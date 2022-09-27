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
