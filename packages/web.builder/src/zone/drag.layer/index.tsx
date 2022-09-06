import * as React from 'react';

import { css, styled } from '@mui/material';

import type { Droppable } from '../../types';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useDragLayer } from 'react-dnd';
import { useStore } from '../../context/scope.provider';

const Positioner = styled(
  'div',
  makeFilterProps(['element', 'x', 'y']),
)<{ element: Droppable; x: number; y: number }>(
  ({ element: { xSpan, ySpan }, x, y }) => css`
    position: absolute;
    left: calc(${x}px - var(--cs) / 2);
    top: calc(${y}px - var(--cs) / 2);
    width: calc(var(--cs) * ${xSpan});
    height: calc(var(--cs) * ${ySpan});
  `,
);

const Container = styled(Positioner)(
  ({ theme }) => css`
    box-shadow: ${theme.shadows[9]};
    opacity: 0.6;
  `,
);

export const DragLayer: React.FC = () => {
  const store = useStore();
  const { isDragging, currentOffset, item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  React.useEffect(() => {
    store.actions.isGridVisible.update(isDragging);
    store.actions.isDragging.update(isDragging);
  }, [isDragging, store]);

  if (!isDragging || !currentOffset) {
    return null;
  }

  return <Container element={item} x={currentOffset.x} y={currentOffset.y} />;
};
