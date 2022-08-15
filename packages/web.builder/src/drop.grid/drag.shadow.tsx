import * as React from 'react';

import {
  cellSizeAtom,
  containerAtom,
  draggingElementAtom,
  gridVisibleAtom,
  useScopeAtom,
  useScopeAtomValue,
} from '../context';
import { css, styled } from '@mui/material';

import { Droppable } from '../types';
import { getPosition } from '../lib/get.position';
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
  const gridArea = useElementGridArea(element);
  const cellSize = useScopeAtomValue(cellSizeAtom);

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
        x: getPosition(nextOffset.x, cellSize),
        y: getPosition(nextOffset.y, cellSize),
      });
    }

    setIsVisible(() =>
      !nextOffset
        ? false
        : containerYAxisStart <= nextOffset.y &&
          containerYAxisEnd >= nextOffset.y,
    );
  }, [manager, container, cellSize, setElement, setIsVisible]);

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
