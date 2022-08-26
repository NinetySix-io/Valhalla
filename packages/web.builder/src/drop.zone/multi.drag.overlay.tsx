import * as React from 'react';

import { css, styled } from '@mui/material';

import { dragCarryAtom } from '../context/drag.carry';
import { getElementGridArea } from '../hooks/use.element';
import { getOutlinedPosition } from '../lib/merge.elements';
import { makeFilterProps } from '@valhalla/web.react/src';
import { uniqueId } from '@valhalla/utilities';
import { useScopeAtom } from '../context';
import { useScopeDrag } from '../context/dnd';

const DraggableBox = styled(
  'div',
  makeFilterProps(['gridArea']),
)<{ gridArea: string }>(
  ({ theme, gridArea }) => css`
    position: relative;
    grid-area: ${gridArea};
    outline: solid 3px ${theme.palette.primary.main};

    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  `,
);

const key = uniqueId('drag-overlay');
export const MultiDragOverlay: React.FC & { key: string } = () => {
  const [dragCarry] = useScopeAtom(dragCarryAtom);
  const isMultiDrag = dragCarry.length > 1;
  const element = getOutlinedPosition(dragCarry);

  const [drag, { isDragging }] = useScopeDrag(
    {
      ...element,
      id: key,
      type: 'box',
    },
    {
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
  );

  if (!isMultiDrag || isDragging) {
    return null;
  }

  return <DraggableBox ref={drag} gridArea={getElementGridArea(element)} />;
};

MultiDragOverlay.key = key;
