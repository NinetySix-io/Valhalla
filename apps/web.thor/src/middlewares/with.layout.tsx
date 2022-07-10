import * as React from 'react';

import { Layout, View } from '@app/types/next';

/**
 * Compose component with layout prop
 */
export function withLayout<P, L>(
  View: View<P, L>,
  Component: React.FC & { Layout: Layout<L> },
) {
  Component['Layout'] = View['Layout'];

  return <Component />;
}
