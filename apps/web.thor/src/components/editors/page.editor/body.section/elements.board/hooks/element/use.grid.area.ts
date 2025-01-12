import * as React from 'react';

import type { PageElement } from '@app/components/editors/page.editor/types';
import { getGridArea } from '../../lib/get.grid.area';
import { useSectionStore } from '../../../scope.provider';

/**
 * It takes a grid area element and returns a string that can be used as the `grid-area` CSS property
 */
export function useElementGridArea(element: PageElement) {
  const store = useSectionStore();
  const container = store.useSelect((state) => state.container);
  const [gridArea, setGridArea] = React.useState<string>();

  React.useEffect(() => {
    if (!container || !element) {
      return;
    }

    setGridArea(getGridArea(element.desktop));
  }, [element, container]);

  return gridArea;
}
