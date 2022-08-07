import * as React from 'react';

import {
  focusedElementAtom,
  isDraggingOverAtom,
  useScopeAtomValue,
  useZoneId,
} from '../context';

import useDebounceTrigger from '@valhalla/web.react/src/hooks/use.debounce.trigger';
import { useThrottleTrigger } from '@valhalla/web.react/src';

type Props = {
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
};

export function DropZoneCallbackManager({ onElementFocus, onDragging }: Props) {
  const zoneId = useZoneId();
  const isDragging = useScopeAtomValue(isDraggingOverAtom);
  const focusedElement = useScopeAtomValue(focusedElementAtom);

  useDebounceTrigger(() => onElementFocus?.(focusedElement, zoneId), 200, [
    onElementFocus,
    focusedElement,
    zoneId,
  ]);

  useThrottleTrigger(() => onDragging?.(isDragging, zoneId), 200, [
    onDragging,
    isDragging,
    zoneId,
  ]);

  return <React.Fragment />;
}
