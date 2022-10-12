import * as React from 'react';

import { Button, Popover, Stack, TextField, css, styled } from '@mui/material';

import { EditorMenu } from '../../menu';
import { EditorStore } from '../../store';
import { ElementMenuGroup } from './group';
import { ElementMenuGroupItem } from './item';
import { ElementType } from '@app/generated/valhalla.gql';
import { useHelperDisplay } from '../hooks/use.helpers.display';

const Container = styled(Stack)(
  ({ theme }) => css`
    padding: ${theme.spacing(3)};
    width: 400px;
  `,
);

type Props = Pick<
  React.ComponentProps<typeof EditorMenu>,
  'style' | 'placement'
>;

export const ElementsMenu: React.FC<Props> = ({ ...props }) => {
  const isDragging = EditorStore.useSelect((state) => state.isDragging);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const anchor = React.useRef<HTMLDivElement>();
  const isVisible = useHelperDisplay();

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  React.useEffect(() => {
    if (isDragging) {
      setMenuVisible(false);
    }
  }, [isDragging, setMenuVisible]);

  return (
    <EditorMenu {...props} isVisible={isVisible} ref={anchor}>
      <Button size="small" onClick={openMenu}>
        Add Element
      </Button>
      <Popover
        elevation={2}
        open={menuVisible}
        keepMounted={false}
        anchorEl={() => anchor.current}
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
            <ElementMenuGroupItem
              element={{
                type: ElementType.TEXT,
                json: {},
                html: '',
                desktop: {
                  x: 1,
                  y: 1,
                  width: 2,
                  height: 1,
                  isVisible: true,
                },
              }}
            >
              Text
            </ElementMenuGroupItem>
          </ElementMenuGroup>
        </Container>
      </Popover>
    </EditorMenu>
  );
};
