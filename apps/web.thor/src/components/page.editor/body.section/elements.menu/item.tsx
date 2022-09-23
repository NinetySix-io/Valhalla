import { Button, Grid, css, styled } from '@mui/material';

import { MENU_ITEM } from '../../constants';
import type { MenuElement } from '../../types';
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

export const ElementMenuGroupItem: React.FC<Props> = ({
  children,
  element,
}) => {
  const draggable = useDraggable({
    id: MENU_ITEM + element.type,
    data: element,
  });

  return (
    <Grid item md={6}>
      <Item
        disableRipple
        fullWidth
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        {...draggable.listeners}
      >
        {children}
      </Item>
    </Grid>
  );
};
