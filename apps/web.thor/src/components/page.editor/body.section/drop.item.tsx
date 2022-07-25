import * as React from 'react';

import { DropIdContext, useActiveDrop, useSectionId } from '../context';
import {
  Menu,
  MenuItem,
  Typography,
  css,
  styled,
  useTheme,
} from '@mui/material';
import { SectionDrop, SiteEditorSlice } from '@app/redux/slices/editor';
import { XYCoord, useDrag } from 'react-dnd';
import { batch, useDispatch } from 'react-redux';

import { ELEMENT } from '../constants';
import { Key } from 'ts-key-enum';
import { isNil } from '@valhalla/utilities';
import { makeFilter } from '@app/lib/make.filter';
import { useKeyPressEvent } from 'react-use';

const Container = styled('div', {
  shouldForwardProp: makeFilter(['isActive']),
})<{ isActive: boolean }>(
  ({ theme, isActive }) => css`
    padding: ${theme.spacing(1)};
    outline: solid 2px ${isActive ? theme.palette.common.black : 'transparent'};

    :hover {
      cursor: grab;
      outline-color: ${theme.palette.common.black};
    }
  `,
);

type Props = {
  value: SectionDrop;
};

export const DropItem: React.FC<Props> = ({ value: { id: dropId, type } }) => {
  const sectionId = useSectionId();
  const activeDrop = useActiveDrop();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isActive = activeDrop === dropId;
  const [ctxMenuPos, setCtxMenuPos] = React.useState<XYCoord>();

  const [, drag] = useDrag<Omit<SectionDrop, 'id'>>(() => ({
    type: ELEMENT,
    item: {
      type,
    },
  }));

  function handleDelete() {
    if (!isActive) {
      return;
    }

    batch(() => {
      dispatch(SiteEditorSlice.actions.setActiveDrop(null));
      dispatch(SiteEditorSlice.actions.removeDrop({ sectionId, dropId }));
    });
  }

  function markActive(event?: React.MouseEvent<HTMLElement, MouseEvent>) {
    event?.preventDefault();
    if (!event || event.currentTarget.id === dropId) {
      dispatch(SiteEditorSlice.actions.setActiveDrop(dropId));
    }
  }

  function handleContextMenu(event: React.MouseEvent) {
    event.preventDefault();
    markActive();
    setCtxMenuPos({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function disposeContextMenu() {
    setCtxMenuPos(null);
  }

  useKeyPressEvent(Key.Backspace, () => {
    handleDelete();
  });

  return (
    <DropIdContext.Provider value={dropId}>
      <Container
        id={dropId}
        ref={drag}
        onContextMenu={handleContextMenu}
        onClick={markActive}
        isActive={isActive}
      >
        <Typography>{type.toUpperCase()}</Typography>
      </Container>
      <Menu
        open={!isNil(ctxMenuPos)}
        onClose={disposeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: ctxMenuPos?.y,
          left: ctxMenuPos?.x,
        }}
      >
        <MenuItem
          style={{ color: theme.palette.error.main }}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </DropIdContext.Provider>
  );
};
