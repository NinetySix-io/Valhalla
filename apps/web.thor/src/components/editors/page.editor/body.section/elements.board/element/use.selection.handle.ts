import * as React from 'react';

import type { PageElement } from '../../../types';
import isNil from 'lodash.isnil';
import { useEvent } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

/**
 * It adds a mousedown event listener to the element that will either set the focus or add the element
 * to the selection
 */
export function useSelectionHandle(element: PageElement) {
  const container = React.useRef<HTMLElement>();
  const store = useSectionStore();

  useEvent(container, 'mouseup', () => {
    const { isHoldingDownShiftKey, focused } = store.getState();
    const hasFocus = !isNil(focused);
    if (!isHoldingDownShiftKey || !hasFocus) {
      store.actions.setFocus(element.id);
    }
  });

  useEvent(container, 'mousedown', () => {
    const { isHoldingDownShiftKey, selections } = store.getState();
    if (!selections.includes(element.id)) {
      store.actions.setSelection(element.id, !isHoldingDownShiftKey);
    }
  });

  return container;
}
