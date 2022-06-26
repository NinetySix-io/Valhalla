import { ValueOf } from '@app/types/value.of';

export const HOME = '/';
export const ME = '/me';
export const AUTH = '/auth';
export const AUTH_WITH_USERNAME = '/auth/with-username';

export const PAGES = {
  LANDING: HOME,
  HOME,
  ME,
  AUTH,
  AUTH_WITH_USERNAME,
} as const;

export type AppPages = ValueOf<typeof PAGES>;
