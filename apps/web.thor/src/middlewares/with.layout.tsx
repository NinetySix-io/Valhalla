import * as React from 'react';

import { NextPage } from 'next';

export function withLayout<P, T>(Page: NextPage<P, T>, Component: React.FC) {
  Component['Layout'] = Page['Layout'];

  return <Component />;
}