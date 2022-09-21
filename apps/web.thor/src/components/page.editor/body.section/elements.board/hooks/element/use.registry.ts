import * as React from 'react';

import type { DroppedElement } from '@app/components/page.editor/types';
import { useSectionStore } from '../../../scope.provider';

/**
 * It takes a DroppedElement and returns a function that takes a ref and adds it to the store
 */
export function useElementRegistry(element: DroppedElement) {
  const store = useSectionStore();
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    store.actions.addElement(element, ref.current);
  }, [element, store]);

  return ref;
}
