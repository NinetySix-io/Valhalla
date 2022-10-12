import * as React from 'react';

import { Button, Grid, css, styled } from '@mui/material';

import { MENU_ITEM } from '../../constants';
import type { PageElement } from '../../types';
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
  element: Omit<
    PageElement,
    | 'id'
    | 'mobile'
    | 'tablet'
    | 'group'
    | 'createdAt'
    | 'updatedAt'
    | 'updatedBy'
    | 'createdBy'
  >;
};

export const ElementMenuGroupItem: React.FC<Props> = ({
  children,
  element,
}) => {
  const ref = React.useRef<HTMLButtonElement>();
  const clampCell = useClampElement();
  const elementId = MENU_ITEM + element.type;
  const data = React.useMemo(
    () =>
      clampCell(
        {
          ...element,
          desktop: element.desktop,
          id: elementId,
        },
        {
          x: ref.current?.offsetLeft ?? 0,
          y: ref.current?.offsetTop ?? 0,
        },
      ),
    [clampCell, element, elementId, ref],
  );

  const draggable = useDraggable({
    id: elementId,
    data,
  });

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
