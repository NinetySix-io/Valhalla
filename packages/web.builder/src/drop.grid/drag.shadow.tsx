import * as React from 'react';

import {
  cellSizeAtom,
  draggingElementAtom,
  gridVisibleAtom,
  useScopeAtom,
  useScopeAtomValue,
} from '../context';
import { css, styled } from '@mui/material';
import { useCellClampX, useCellClampY } from '../hooks/use.cell.clamp';

import { DroppedElement } from '../types';
import { builderEvents } from '../lib/events';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useDragMonitorOffset } from '../hooks/use.drag.monitor';
import { useElementGridArea } from '../hooks/use.element';

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
  const gridIsVisible = useScopeAtomValue(gridVisibleAtom);
  const [isVisible, setIsVisible] = React.useState(false);
  const [element, setElement] = useScopeAtom(draggingElementAtom);
  const gridArea = useElementGridArea(element);
  const cellSize = useScopeAtomValue(cellSizeAtom);

  useDragMonitorOffset((monitor) => {
    const nextOffset = monitor.getSourceClientOffset();
    const nextElement: DroppedElement = monitor.getItem();

    if (!nextOffset || !nextElement) {
      if (element) {
        builderEvents.emit('itemUpdate', element);
      }

      setIsVisible(false);
      setElement(null);
    } else {
      // offset so it will be centered
      const offset = cellSize / 2;
      setIsVisible(true);
      setElement({
        ...nextElement,
        x: clampX(nextOffset.x - offset, nextElement.xSpan),
        y: clampY(nextOffset.y - offset, nextElement.ySpan),
      });
    }
  });

  return (
    <Container isVisible={gridIsVisible && isVisible} gridArea={gridArea} />
  );
};
