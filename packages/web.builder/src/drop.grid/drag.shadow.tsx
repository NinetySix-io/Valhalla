import * as React from 'react';

import {
  cellSizeAtom,
  useScopeAtomValue,
  useScopeAtomValueFetch,
} from '../context';
import { css, styled } from '@mui/material';
import { useCellClampX, useCellClampY } from '../hooks/use.cell.clamp';

import { DroppedElement } from '../types';
import { MultiDragOverlay } from '../drop.zone/multi.drag.overlay';
import { builderEvents } from '../lib/events';
import { dragCarryAtom } from '../context/drag.carry';
import { getElementGridArea } from '../hooks/use.element';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useDragMonitorOffset } from '../hooks/use.drag.monitor';

const Container = styled(
  'div',
  makeFilterProps(['gridArea', 'isVisible']),
)<{
  gridArea: string;
  isVisible: boolean;
}>(
  ({ theme, isVisible, gridArea }) => css`
    transition: all 0.2s;
    border: solid 3px transparent;
    margin-left: calc(var(--pt-w) * 0.5);
    margin-right: calc(var(--pt-w) / -1);
    margin-bottom: calc(var(--pt-w) * -2);

    ${isVisible && gridArea
      ? css`
          z-index: -1;
          grid-area: ${gridArea};
          border-color: ${theme.palette.primary.main};
        `
      : css`
          display: none;
        `}
  `,
);

export const DragShadow: React.FC = () => {
  const clampX = useCellClampX();
  const clampY = useCellClampY();
  const [isVisible, setIsVisible] = React.useState(false);
  const [element, setElement] = React.useState<DroppedElement>();
  const getDragCarry = useScopeAtomValueFetch(dragCarryAtom);
  const cellSize = useScopeAtomValue(cellSizeAtom);
  const cache = React.useRef<DroppedElement[]>([]);

  useDragMonitorOffset(async (monitor) => {
    const nextOffset = monitor.getSourceClientOffset();
    const draggingElement: DroppedElement = monitor.getItem();
    const isMultiDrag =
      draggingElement?.id === MultiDragOverlay.key ||
      element?.id === MultiDragOverlay.key;

    if (!nextOffset || !draggingElement) {
      setIsVisible(false);

      // There can only be one added at a time
      if (!isMultiDrag && element && !element.id) {
        builderEvents.emit('elementAdded', {
          type: draggingElement.type,
          ...element,
        });
      } else if (cache.current.length > 0) {
        builderEvents.emit('elementsUpdated', cache.current);
      }

      cache.current = [];
      setElement(null);
    } else {
      setIsVisible(true);

      // offset so it will be centered
      const offset = cellSize / 2;
      const nextX = clampX(nextOffset.x - offset, draggingElement.xSpan);
      const nextY = clampY(nextOffset.y - offset, draggingElement.ySpan);
      if (!isMultiDrag) {
        const nextElement = {
          ...draggingElement,
          x: nextX,
          y: nextY,
        };

        setElement(nextElement);
        cache.current = [nextElement];
      } else {
        const diffX = nextX - draggingElement.x;
        const diffY = nextY - draggingElement.y;
        const dragCarry = await getDragCarry();
        cache.current = dragCarry.map((item): DroppedElement => {
          return {
            ...item,
            x: item.x + diffX,
            y: item.y + diffY,
          };
        });

        setElement({
          ...draggingElement,
          x: nextX,
          y: nextY,
          type: 'box',
          id: draggingElement.id,
        });
      }
    }
  });

  if (!element) {
    return null;
  }

  return (
    <Container isVisible={isVisible} gridArea={getElementGridArea(element)} />
  );
};
