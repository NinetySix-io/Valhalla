import * as React from 'react';

import { BUTTON_ELEMENT, TEXT_ELEMENT } from '../../constants';
import { Button, Popover, Stack, TextField, css, styled } from '@mui/material';

import { EditorMenu } from '../../menu';
import { ElementMenuGroup } from './group';
import { ElementMenuGroupItem } from './item';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import { useDispatch } from 'react-redux';
import { useDragDropManager } from 'react-dnd';
import { useIsDragging } from '../../context';

const Container = styled(Stack)(
  ({ theme }) => css`
    padding: ${theme.spacing(3)};
    width: 400px;
  `,
);

type Props = {
  isVisible: boolean;
} & Pick<React.ComponentProps<typeof EditorMenu>, 'style' | 'placement'>;

export const ElementsMenu: React.FC<Props> = ({ isVisible, ...props }) => {
  const dispatch = useDispatch();
  const isDragging = useIsDragging();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const manager = useDragDropManager();
  const anchor = React.useRef<HTMLDivElement>(null);

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  React.useEffect(() => {
    const monitor = manager.getMonitor();
    const unsubscribe = monitor.subscribeToStateChange(() => {
      dispatch(SiteEditorSlice.actions.setIsDragging(monitor.isDragging()));
    });

    return () => {
      unsubscribe?.();
    };
  }, [manager, dispatch]);

  React.useEffect(() => {
    if (isDragging) {
      setMenuVisible(false);
    }
  }, [isDragging, setMenuVisible]);

  return (
    <EditorMenu {...props} open={isVisible} containerRef={anchor}>
      <Button size="small" onClick={openMenu}>
        Add Element
      </Button>
      <Popover
        elevation={2}
        open={menuVisible}
        keepMounted={false}
        anchorEl={anchor.current}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Container direction="column" spacing={2.5}>
          <TextField autoFocus size="small" placeholder="Search" />
          <ElementMenuGroup title="Primitives">
            <ElementMenuGroupItem element={TEXT_ELEMENT}>
              Text
            </ElementMenuGroupItem>
            <ElementMenuGroupItem element={BUTTON_ELEMENT}>
              Button
            </ElementMenuGroupItem>
          </ElementMenuGroup>
        </Container>
      </Popover>
    </EditorMenu>
  );
};
