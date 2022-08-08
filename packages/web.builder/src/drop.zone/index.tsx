import * as React from 'react';

import type { ConnectableElement, DropTargetMonitor } from 'react-dnd';
import type { DropCandidate, Droppable, DroppedElement } from '../types';
import {
  ZoneIdContext,
  cellSizeAtom,
  useScopeAtomValue,
  useZoneId,
} from '../context';

import { DropGrid } from '../drop.grid';
import { DropZoneCallbackManager } from './callback.manager';
import { DropZoneItem } from './item';
import { cProps } from '@valhalla/web.react';
import { getPosition } from '../lib/get.position';
import { mergeRefs } from 'react-merge-refs';
import { uniqueId } from '@valhalla/utilities';
import { useDrop } from 'react-dnd';
import { useDropDimension } from '../hooks/use.dimension';

type Props<T extends Droppable> = cProps<
  {
    rowsCount: number;
    columnsCount: number;
    onDrop?: (
      item: DropCandidate<T> | DroppedElement<T>,
      monitor: DropTargetMonitor,
    ) => void;
    onAddItem?: (
      item: Omit<DroppedElement<T>, 'id'>,
      monitor: DropTargetMonitor,
    ) => void;
    onUpdateItem?: (
      item: DroppedElement<T>,
      monitor?: DropTargetMonitor,
    ) => void;
    value?: Array<DroppedElement>;
  } & React.ComponentProps<typeof DropZoneCallbackManager>
>;

function DropZoneContent<T extends Droppable, E extends DroppedElement<T>>({
  id,
  rowsCount,
  columnsCount,
  onElementFocus,
  onDragging,
  onDrop,
  onAddItem,
  onUpdateItem,
  value,
  ...props
}: Props<T>) {
  const zoneId = useZoneId();
  const dimensionRef = useDropDimension(columnsCount);
  const cellSize = useScopeAtomValue(cellSizeAtom);

  const [, drop] = useDrop<E>(
    () => ({
      accept: zoneId,
      drop(item, monitor) {
        const offset = monitor.getSourceClientOffset();
        const nextX = getPosition(offset.x, cellSize);
        const nextY = getPosition(offset.y, cellSize);
        const nextItem = { ...item, x: nextX, y: nextY };

        onDrop?.(nextItem, monitor);
        if ('id' in item) {
          onUpdateItem?.(nextItem, monitor);
        } else {
          onAddItem?.(nextItem, monitor);
        }
      },
    }),
    [cellSize, zoneId, getPosition, onUpdateItem, onAddItem, onDrop],
  );

  return (
    <DropGrid
      {...props}
      id={id}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
      ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
        drop,
        dimensionRef,
      ])}
    >
      <DropZoneCallbackManager
        onElementFocus={onElementFocus}
        onDragging={onDragging}
      />
      {value?.map((element) => (
        <DropZoneItem
          key={element.id}
          element={element}
          onChange={(nextEl) => onUpdateItem(nextEl as DroppedElement<T>)}
        />
      ))}
    </DropGrid>
  );
}

export function DropZone<T extends Droppable>({ id, ...props }: Props<T>) {
  const zoneId = React.useRef(uniqueId('zone')).current;

  return (
    <ZoneIdContext.Provider value={id || zoneId}>
      <DropZoneContent {...props} />
    </ZoneIdContext.Provider>
  );
}
