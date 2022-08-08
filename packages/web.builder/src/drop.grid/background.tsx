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
import { makeFilterProps } from '@valhalla/web.react';
import { useDragDropManager } from 'react-dnd';
import { useElementGridArea } from '../hooks/use.element';

const Container = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    --bg-pos: calc((var(--cs) / 2) + var(--pt-w));
    --bg-color: ${theme.palette.grey[600]};
    opacity: ${isVisible ? 0.5 : 0};
    width: 100%;
    height: 100%;
    transition: all 0.2s;
    transition-timing-function: ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: radial-gradient(var(--bg-color) var(--pt-w), transparent 3px),
      radial-gradient(var(--bg-color) var(--pt-w), transparent 3px), #fff;
    background-position: calc(var(--bg-pos)) calc(var(--bg-pos));
    background-size: var(--cs) var(--cs);
  `,
);

const Highlighter = styled(
  'div',
  makeFilterProps(['gridArea', 'isVisible']),
)<{
  gridArea: string;
  isVisible: boolean;
}>(({ theme, gridArea, isVisible }) => {
  return css`
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
  `;
});

export const Background: React.FC = () => {
  const monitor = useDragDropManager().getMonitor();
  const container = useScopeAtomValue(containerAtom);
  const [isVisible, setIsVisible] = useScopeAtom(gridVisibleAtom);
  const [element, setElement] = useScopeAtom(draggingElementAtom);
  const elementGridArea = useElementGridArea(element);
  const cellSize = useScopeAtomValue(cellSizeAtom);

  const handleOffsetChange = React.useCallback(() => {
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
  }, [monitor, container, cellSize, setElement, setIsVisible]);

  React.useEffect(() => {
    const unsubscribe = monitor.subscribeToOffsetChange(handleOffsetChange);
    return () => {
      unsubscribe();
    };
  }, [monitor, handleOffsetChange]);

  return (
    <React.Fragment>
      <Highlighter isVisible={isVisible} gridArea={elementGridArea} />
      <Container isVisible={isVisible} />
    </React.Fragment>
  );
};
