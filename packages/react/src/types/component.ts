import { CSSProperties } from 'react';

export type cProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};
