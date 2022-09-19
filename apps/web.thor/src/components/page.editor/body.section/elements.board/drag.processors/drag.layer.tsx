import * as React from 'react';

import type { DroppedElement, MenuElement } from '../../../types';
import { css, styled } from '@mui/material';

import { TEMP_ITEM } from '@app/components/page.editor/constants';
import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { useDragLayer } from 'react-dnd';
import { useSectionStore } from '../../scope.provider';

const Positioner = styled(
  'div',
  makeFilterProps(['element', 'x', 'y']),
)<{ element: MenuElement; x: number; y: number }>(
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
  const store = useSectionStore();
  const { isDragging, currentOffset, item } = useDragLayer((monitor) => ({
    item: monitor.getItem() as DroppedElement,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  React.useEffect(() => {
    if (store.getState().dragging?.id !== item?.id) {
      store.actions.setDragging(item);
    } else if (!isNil(item)) {
      store.actions.setDragging({
        id: TEMP_ITEM,
        ...item,
      });
    }
  }, [item, store]);

  if (!isDragging || !currentOffset) {
    return null;
  }

  return <Container element={item} x={currentOffset.x} y={currentOffset.y} />;
};
