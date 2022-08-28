import * as React from 'react';

import { ZoneContext, useScopeAtomMutate, useZoneId } from '../context';
import { cProps, useEvent } from '@valhalla/web.react';
import { uniqBy, uniqueId } from '@valhalla/utilities';

import type { ConnectableElement } from 'react-dnd';
import { DragHighlighter } from './drag.highlighter';
import { DragLayer } from './drag.layer';
import { DragShadow } from './drag.shadow';
import { DropGrid } from '../drop.grid';
import { DropZoneItem } from './item';
import type { DroppedElement } from '../types';
import { MultiDragOverlay } from './multi.drag.overlay';
import { Resizer } from '../drop.item/resizer';
import { dragCarryAtom } from '../context/drag.carry';
import { focusedElementAtom } from '../context/focus.element';
import { mergeRefs } from 'react-merge-refs';
import { useAddElement } from '../hooks/events/use.add.element';
import { useBuilderEvents } from '../hooks/events/use.builder.events';
import { useDragOverflowListener } from '../hooks/use.drag.overflow.listener';
import { useDragSelectHighlight } from '../context/drag.select';
import { useDropDimension } from '../hooks/use.dimension';
import { useListenToShiftKey } from '../context/shift.key.pressed';
import { useScopeDrop } from '../context/dnd';
import { useUpdateElement } from '../hooks/events/use.update.element';

type Props = cProps<{
  rowsCount: number;
  columnsCount: number;
  onAddItem?: (item: Omit<DroppedElement, 'id'>) => void;
  onUpdateItems?: (item: DroppedElement[]) => void;
  onRowExpand?: (rowsCount: number) => void;
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
  value?: Array<DroppedElement>;
}>;

function DropZoneContent({
  id,
  onElementFocus,
  onDragging,
  onAddItem,
  onUpdateItems,
  onRowExpand,
  value,
  ...props
}: Omit<Props, 'columnsCount' | 'rowsCount'>) {
  const zoneId = useZoneId();
  const container = React.useRef<HTMLDivElement>();
  const dimensionRef = useDropDimension();
  const highlightRef = useDragSelectHighlight();
  const setFocusedElement = useScopeAtomMutate(focusedElementAtom);
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);
  const [, drop] = useScopeDrop();

  useDragOverflowListener();
  useListenToShiftKey();

  useEvent(container.current, 'mouseup', (event) => {
    /**
     * If clicking outside of the element, in this case, the zone,
     * it would lose focus
     */
    const target = event.target as HTMLElement;
    if (container.current.isSameNode(target)) {
      setFocusedElement(undefined);
      setDragCarry([]);
    }
  });

  useBuilderEvents('elementDragging', (element) =>
    onDragging?.(element.isDragging, zoneId),
  );

  useBuilderEvents('elementFocus', (element) =>
    onElementFocus?.(element.elementId, zoneId),
  );

  useBuilderEvents('gridRowsUpdate', (nextRowsCount) =>
    onRowExpand?.(nextRowsCount),
  );

  useUpdateElement((elements) => {
    onUpdateItems?.(uniqBy(elements.concat(value), (element) => element.id));
  });

  useAddElement((element) => {
    onAddItem?.(element);
  });

  React.useEffect(() => {
    setDragCarry((current) =>
      current
        .map((element) => value?.find((item) => item.id === element.id))
        .filter((element) => element !== undefined),
    );
  }, [value, setDragCarry]);

  return (
    <DropGrid
      {...props}
      id={id}
      ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
        drop,
        dimensionRef,
        highlightRef,
        container,
      ])}
    >
      <DragShadow />
      <DragLayer />
      <Resizer />
      {value?.map((element) => (
        <DropZoneItem key={element.id} element={element} />
      ))}
      <MultiDragOverlay />
      <DragHighlighter />
    </DropGrid>
  );
}

export function DropZone({ id, columnsCount, rowsCount, ...props }: Props) {
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
