import * as React from 'react';

import { Layout, Page } from '@app/types/next';

/**
 * WithLayout is a function that takes a Page and a Component and returns a Component with the Page's
 * Layout.
 */
export function withLayout<P, L>(
  Page: Page<P, L>,
  Component: React.FC & { Layout: Layout<L> },
) {
  Component['Layout'] = Page['Layout'];

  return <Component />;
}
