import * as React from 'react';

import type { ConnectableElement, DropTargetMonitor } from 'react-dnd';
import type { DropCandidate, Droppable, DroppedElement } from '../types';
import {
  ZoneContext,
  cellSizeAtom,
  useScopeAtomValue,
  useZoneId,
} from '../context';
import { useCellClampX, useCellClampY } from '../hooks/use.cell.clamp';

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
  onElementFocus,
  onDragging,
  onDrop,
  onAddItem,
  onUpdateItem,
  value,
  ...props
}: Omit<Props<T>, 'columnsCount' | 'rowsCount'>) {
  const zoneId = useZoneId();
  const dimensionRef = useDropDimension();
  const cellSize = useScopeAtomValue(cellSizeAtom);
  const clampX = useCellClampX();
  const clampY = useCellClampY();

  const [, drop] = useDrop<E>(
    () => ({
      accept: zoneId,
      drop(item, monitor) {
        const offset = monitor.getSourceClientOffset();
        const nextX = clampX(offset.x, item.xSpan);
        const nextY = clampY(offset.y, item.ySpan);
        const nextItem = { ...item, x: nextX, y: nextY };

        onDrop?.(nextItem, monitor);
        if ('id' in item) {
          onUpdateItem?.(nextItem, monitor);
        } else {
          onAddItem?.(nextItem, monitor);
        }
      },
    }),
    [
      cellSize,
      zoneId,
      getPosition,
      onUpdateItem,
      onAddItem,
      onDrop,
      clampX,
      clampY,
    ],
  );

  return (
    <DropGrid
      {...props}
      id={id}
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

export function DropZone<T extends Droppable>({
  id,
  columnsCount,
  rowsCount,
  ...props
}: Props<T>) {
  const zoneId = React.useRef(uniqueId('zone')).current;

  return (
    <ZoneContext.Provider
      value={{
        id: id || zoneId,
        columnsCount,
        rowsCount,
      }}
    >
      <DropZoneContent {...props} />
    </ZoneContext.Provider>
  );
}
