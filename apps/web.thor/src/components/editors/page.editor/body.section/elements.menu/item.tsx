import * as React from 'react';

import type { BoardElement, MenuElement, XYCoord } from '../../types';
import { Button, Grid, css, styled } from '@mui/material';

import { MENU_ITEM } from '../../constants';
import { mergeRefs } from 'react-merge-refs';
import { useClampElement } from '../elements.board/hooks/use.element.clamp';
import { useDraggable } from '@dnd-kit/core';

const Item = styled(Button)(
  () => css`
    justify-content: flex-start;
  `,
);

type Props = {
  children: string;
  element: MenuElement;
};

const initialPosition: XYCoord = { x: 1, y: 1 };
export const ElementMenuGroupItem: React.FC<Props> = ({
  children,
  element,
}) => {
  const ref = React.useRef<HTMLButtonElement>();
  const clampCell = useClampElement();
  const elementId = MENU_ITEM + element.type;
  const [data, setData] = React.useState<BoardElement>();
  const draggable = useDraggable({
    id: elementId,
    data: data,
  });

  React.useEffect(() => {
    setData(
      clampCell(
        { id: elementId, ...element, ...initialPosition },
        { x: ref.current.offsetLeft, y: ref.current.offsetTop },
      ),
    );
  }, [clampCell, element, elementId]);

  return (
    <Grid item md={6}>
      <Item
        disableRipple
        fullWidth
        ref={mergeRefs([draggable.setNodeRef, ref])}
        {...draggable.attributes}
        {...draggable.listeners}
      >
        {children}
      </Item>
    </Grid>
  );
};
