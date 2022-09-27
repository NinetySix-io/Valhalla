import * as React from 'react';

import type { SectionState } from '../../store';
import isEmpty from 'lodash.isempty';
import { isMenuItem } from '@app/components/editors/page.editor/lib/is.menu.item';
import omit from 'lodash.omit';
import { useClampElement } from '../hooks/use.element.clamp';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export const DropCollector: React.FC = () => {
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const dragDelta = store.useSelect((state) => state.dragDelta);
  const clampElement = useClampElement();
  const cache = React.useRef<Pick<SectionState, 'dragging' | 'dragDelta'>>();

  const processUpdates = React.useCallback(() => {
    const state = store.getState();
    const selections = state.selections;

    if (!isEmpty(selections)) {
      const elements = Object.values(state.elements);
      const { dragDelta } = cache.current;

      emitter.client.emit(
        'elementsUpdated',
        elements.map((element) =>
          omit(
            selections.includes(element.id)
              ? clampElement(element, dragDelta)
              : element,
            'ref',
          ),
        ),
      );
    }
  }, [clampElement, emitter.client, store]);

  const processAppend = React.useCallback(() => {
    emitter.client.emit('elementAdded', cache.current.dragging);
  }, [emitter.client]);

  React.useEffect(() => {
    if (!dragDelta && cache.current?.dragDelta && cache.current?.dragging) {
      if (isMenuItem(cache.current.dragging.id)) {
        processAppend();
      } else {
        processUpdates();
      }
    }

    cache.current = {
      dragging: store.getState().dragging,
      dragDelta,
    };
  }, [dragDelta, store, processUpdates, processAppend]);

  return null;
};
