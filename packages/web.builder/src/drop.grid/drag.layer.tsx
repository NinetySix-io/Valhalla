import * as React from 'react';

import { css, styled } from '@mui/material';

import { Droppable } from '../types';
import { ElementFactory } from '../element.factory';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useDragLayer } from 'react-dnd';

const Container = styled(
  'div',
  makeFilterProps(['element', 'x', 'y']),
)<{ element: Droppable; x: number; y: number }>(
  ({ theme, element: { xSpan, ySpan }, x, y }) => css`
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: calc(var(--cs) * ${xSpan});
    height: calc(var(--cs) * ${ySpan});
    box-shadow: ${theme.shadows[9]};
    opacity: 0.6;
  `,
);

export const DragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <Container element={item} x={currentOffset.x} y={currentOffset.y}>
      <ElementFactory value={item} />
    </Container>
  );
};
