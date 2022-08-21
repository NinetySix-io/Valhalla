import * as React from 'react';

import { css, styled } from '@mui/material';
import {
  draggingElementAtom,
  gridVisibleAtom,
  useScopeAtom,
  useScopeAtomValue,
} from '../context';
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
      setIsVisible(true);
      setElement({
        ...nextElement,
        x: clampX(nextOffset.x, nextElement.xSpan),
        y: clampY(nextOffset.y, nextElement.ySpan),
      });
    }
  });

  return (
    <Container isVisible={gridIsVisible && isVisible} gridArea={gridArea} />
  );
};
