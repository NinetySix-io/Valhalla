import * as React from 'react';

import {
  focusedElementAtom,
  gridVisibleAtom,
  useScopeAtomValue,
  useZoneId,
} from '../context';
import { useDebounceTrigger, useThrottleTrigger } from '@valhalla/web.react';

type Props = {
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
};

export function DropZoneCallbackManager({ onElementFocus, onDragging }: Props) {
  const zoneId = useZoneId();
  const isDragging = useScopeAtomValue(gridVisibleAtom);
  const focusedElement = useScopeAtomValue(focusedElementAtom);

  useDebounceTrigger(
    () => {
      // !isNil(focusedElement) && onElementFocus?.(focusedElement, zoneId);
    },
    200,
    [onElementFocus, focusedElement, zoneId],
  );

  useThrottleTrigger(
    () => {
      // !isNil(isDragging) && onDragging?.(isDragging, zoneId);
    },
    200,
    [onDragging, isDragging, zoneId],
  );

  return <React.Fragment />;
}
