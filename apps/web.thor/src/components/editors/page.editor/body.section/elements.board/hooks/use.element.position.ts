import * as React from 'react';

import { EditorStore } from '../../../store';
import type { PageElement } from '../../../types';
import { ScreenSize } from '../../../constants';

/**
 * It returns the position of the element based on the current screen size
 */
export function useElementPosition<E extends PageElement>(element: E) {
  const size = EditorStore.useSelect((state) => state.size);
  return React.useMemo(() => {
    return (
      {
        [ScreenSize.DESKTOP]: element.desktop,
        [ScreenSize.TABLET]: element.tablet,
        [ScreenSize.MOBILE]: element.mobile,
      }[size] ?? element.desktop
    );
  }, [size, element]);
}
