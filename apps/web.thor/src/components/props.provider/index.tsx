import type * as React from 'react';

import { provideProps } from './provide.props';

type Props<T extends object> = React.PropsWithChildren & {
  props: T;
};

export function PropsProvider<T extends object>({ props, children }: Props<T>) {
  return Array.isArray(children)
    ? children.map((child) => provideProps(child, props))
    : provideProps(children, props);
}
