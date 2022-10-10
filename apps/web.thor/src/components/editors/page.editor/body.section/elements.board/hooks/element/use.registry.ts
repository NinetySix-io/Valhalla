import * as React from 'react';

import type { PageElement } from '@app/components/editors/page.editor/types';
import { useSectionStore } from '../../../scope.provider';

export function useElementRegistry(element: PageElement) {
  const store = useSectionStore();
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    store.actions.addElement(element, ref.current);
    return () => {
      store.actions.removeElement(element.id);
    };
  }, [element, store]);

  return ref;
}
