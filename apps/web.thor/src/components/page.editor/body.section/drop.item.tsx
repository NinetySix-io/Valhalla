import * as React from 'react';

import { BuilderElement, BuilderElementWithId } from '../types';
import { DropIdContext, useActiveElement, useSectionId } from '../context';
import { Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { XYCoord, useDrag } from 'react-dnd';
import { batch, useDispatch } from 'react-redux';

import { BUILDER_ELEMENT } from '../constants';
import { Drop } from '@valhalla/web.builder';
import { Key } from 'ts-key-enum';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import isNil from 'lodash.isnil';
import omit from 'lodash.omit';
import { useKeyPressEvent } from 'react-use';

type Props = {
  value: BuilderElementWithId;
};

export const DropItem: React.FC<Props> = ({ value: element }) => {
  const sectionId = useSectionId();
  const active = useActiveElement();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isActive = active === element.id;
  const [ctxMenuPos, setCtxMenuPos] = React.useState<XYCoord>();

  const [, drag] = useDrag<BuilderElement>(() => ({
    type: BUILDER_ELEMENT,
    item: omit(element, ['id']),
  }));

  function handleDelete() {
    if (!isActive) {
      return;
    }

    batch(() => {
      dispatch(SiteEditorSlice.actions.setActiveElement(null));
      dispatch(
        SiteEditorSlice.actions.removeElement({
          sectionId,
          elementId: element.id,
        }),
      );
    });
  }

  function markActive(event?: React.MouseEvent<HTMLElement, MouseEvent>) {
    event?.preventDefault();
    if (!event || event.currentTarget.id === element.id) {
      dispatch(SiteEditorSlice.actions.setActiveElement(element.id));
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
    <DropIdContext.Provider value={element.id}>
      <Drop.Item
        x={{ start: 1, end: 2 }}
        y={{ start: 1, end: 3 }}
        id={element.id}
        ref={drag}
        onContextMenu={handleContextMenu}
        onClick={markActive}
        isActive={isActive}
      >
        <Typography>{element.type.toUpperCase()}</Typography>
      </Drop.Item>
      <Menu
        open={!isNil(ctxMenuPos)}
        onClose={disposeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          ctxMenuPos && {
            top: ctxMenuPos?.y,
            left: ctxMenuPos?.x,
          }
        }
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
