import type { ValueOf } from '@app/types/value.of';

export const HOME = '/';
export const ME = '/me';
export const NOT_FOUND = '/404';

export const PAGES = {
  LANDING: HOME,
  HOME,
  ME,
  NOT_FOUND,
} as const;

export const SSO_PAGES = {
  HOME,
  NOT_FOUND,
  AUTH: '/auth',
  WITH_USERNAME: '/auth/with-username',
};

export type AppPages = ValueOf<typeof PAGES>;
