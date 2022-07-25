import { ConnectableElement, DropTargetMonitor, useDrop } from 'react-dnd';
import { DropCandidate, DropType, Droppable, DroppedItem } from '../types';

import { DropDimensionCtx } from '../context';
import { DropGrid } from '../drop.grid';
import { DropItem } from '../drop.item';
import { ElementFactory } from '../element.factory';
import { cProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useDropDimension } from '../hooks/use.cell.size';

type Props<T extends Droppable> = cProps<{
  accepts: DropType;
  rowsCount: number;
  columnsCount: number;
  onDrop?: (
    item: DropCandidate<T> | DroppedItem<T>,
    monitor: DropTargetMonitor,
  ) => void;
  onAddItem?: (
    item: Omit<DroppedItem<T>, 'id'>,
    monitor: DropTargetMonitor,
  ) => void;
  onUpdateItem?: (item: DroppedItem<T>, monitor: DropTargetMonitor) => void;
  value?: Array<DroppedItem>;
}>;

export function DropZone<T extends Droppable>({
  accepts,
  rowsCount,
  columnsCount,
  onDrop,
  onAddItem,
  onUpdateItem,
  value,
  ...props
}: Props<T>) {
  const {
    ref: dimensionRef,
    cellSize,
    container,
  } = useDropDimension(columnsCount);

  const [, drop] = useDrop<DroppedItem<T>>(() => ({
    accept: accepts,
    drop(item, monitor) {
      const offset = monitor.getSourceClientOffset();
      const nextItem = { ...item };
      nextItem.topLeftX = offset.x;
      nextItem.topLeftY = offset.y;

      onDrop?.(nextItem, monitor);
      if ('id' in item) {
        onUpdateItem?.(nextItem, monitor);
      } else {
        onAddItem?.(nextItem, monitor);
      }
    },
  }));

  return (
    <DropDimensionCtx.Provider value={{ cellSize: cellSize, container }}>
      <DropGrid
        {...props}
        rowsCount={rowsCount}
        columnsCount={columnsCount}
        ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
          drop,
          dimensionRef,
        ])}
      >
        {value?.map((element) => (
          <DropItem key={element.id} dropType={accepts} element={element}>
            <ElementFactory value={element} />
          </DropItem>
        ))}
      </DropGrid>
    </DropDimensionCtx.Provider>
  );
}
