import * as React from 'react';

import { provideProps } from './provide.props';

type Props<T extends object> = React.PropsWithChildren & {
  props: T;
};

export function PropsProvider<T extends object>({ props, children }: Props<T>) {
  return (
    // skipcq: JS-0424
    <React.Fragment>
      {Array.isArray(children)
        ? children.map((child) => provideProps(child, props))
        : provideProps(children, props)}
    </React.Fragment>
  );
}
