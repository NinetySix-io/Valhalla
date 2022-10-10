export enum ScreenSize {
  DESKTOP = 1200,
  TABLET = 820,
  MOBILE = 400,
}

export enum ScreenType {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export const MENU_ITEM = 'MENU_ITEM';

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
