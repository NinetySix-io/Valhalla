import type { PageElement } from '../../../types';
import React from 'react';
import { selectMoveTransform } from './selectors';
import { useSectionStore } from '../../scope.provider';

export function useDelayedPosition(element: PageElement) {
  const store = useSectionStore();
  const transform = store.useSelect(selectMoveTransform(element));
  const [cache, setCache] = React.useState(transform);

  React.useEffect(() => {
    if (transform) {
      setCache(() => transform);
    }
  }, [transform]);

  React.useEffect(() => {
    setCache(null);
  }, [element]);

  return cache;
}
