import * as React from 'react';

import { Button, Popover, Stack, TextField, css, styled } from '@mui/material';
import { activeSection, isDragging } from '../atoms';

import { EditorMenu } from '../../menu';
import { ElementMenuGroup } from './group';
import { ElementMenuGroupItem } from './item';
import { useAtom } from 'jotai';
import { useDragDropManager } from 'react-dnd';

const Container = styled(Stack)(
  ({ theme }) => css`
    padding: ${theme.spacing(3)};
    width: 400px;
  `,
);

type Props = {
  sectionId: string;
} & Pick<React.ComponentProps<typeof EditorMenu>, 'style' | 'placement'>;

export const ElementsMenu: React.FC<Props> = ({ sectionId, ...props }) => {
  const [active, setActive] = useAtom(activeSection);
  const [isActivelyDragging, setIsActivelyDragging] = useAtom(isDragging);
  const manager = useDragDropManager();
  const anchor = React.useRef<HTMLDivElement>();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const isVisible = active === sectionId;

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  React.useEffect(() => {
    const monitor = manager.getMonitor();
    const unsubscribe = monitor.subscribeToStateChange(() => {
      setIsActivelyDragging(monitor.isDragging());
    });

    return () => {
      unsubscribe?.();
    };
  }, [manager, setIsActivelyDragging]);

  React.useEffect(() => {
    if (isActivelyDragging) {
      setMenuVisible(false);
      setActive(null);
    }
  }, [isActivelyDragging, setMenuVisible, setActive]);

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
            <ElementMenuGroupItem>Text</ElementMenuGroupItem>
            <ElementMenuGroupItem>Button</ElementMenuGroupItem>
            <ElementMenuGroupItem>Image</ElementMenuGroupItem>
            <ElementMenuGroupItem>Video</ElementMenuGroupItem>
            <ElementMenuGroupItem>Gallery</ElementMenuGroupItem>
            <ElementMenuGroupItem>Line</ElementMenuGroupItem>
          </ElementMenuGroup>
        </Container>
      </Popover>
    </EditorMenu>
  );
};
