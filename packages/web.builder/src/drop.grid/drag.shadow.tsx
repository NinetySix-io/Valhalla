import * as React from 'react';

import {
  containerAtom,
  draggingElementAtom,
  gridVisibleAtom,
  useScopeAtom,
  useScopeAtomValue,
} from '../context';
import { css, styled } from '@mui/material';
import { useCellClampX, useCellClampY } from '../hooks/use.cell.clamp';

import { Droppable } from '../types';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useDragDropManager } from 'react-dnd';
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
  const manager = useDragDropManager();
  const container = useScopeAtomValue(containerAtom);
  const gridIsVisible = useScopeAtomValue(gridVisibleAtom);
  const [isVisible, setIsVisible] = React.useState(false);
  const [element, setElement] = useScopeAtom(draggingElementAtom);
  const clampX = useCellClampX();
  const clampY = useCellClampY();
  const gridArea = useElementGridArea(element);

  const handleOffsetChange = React.useCallback(() => {
    const monitor = manager.getMonitor();
    const nextOffset = monitor.getSourceClientOffset();
    const nextElement: Droppable = monitor.getItem();
    const containerBound = container.getBoundingClientRect();
    const containerYAxisStart = containerBound.y;
    const containerYAxisEnd = containerYAxisStart + containerBound.height;

    if (!nextOffset || !nextElement) {
      setElement(null);
    } else {
      setElement({
        ...nextElement,
        x: clampX(nextOffset.x, nextElement.xSpan),
        y: clampY(nextOffset.y, nextElement.ySpan),
      });
    }

    setIsVisible(() =>
      !nextOffset
        ? false
        : containerYAxisStart <= nextOffset.y &&
          containerYAxisEnd >= nextOffset.y,
    );
  }, [manager, container, clampX, clampY, setElement, setIsVisible]);

  React.useEffect(() => {
    const unsubscribe = manager
      .getMonitor()
      .subscribeToOffsetChange(handleOffsetChange);

    return () => {
      unsubscribe();
    };
  }, [manager, handleOffsetChange]);

  return (
    <Container isVisible={gridIsVisible && isVisible} gridArea={gridArea} />
  );
};
