import * as React from 'react';

import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  css,
  styled,
} from '@mui/material';

import { EditorStore } from '@app/components/page.editor/store';
import { ScreenSize } from '@app/components/page.editor/constants';
import { useAnchor } from '@app/hooks/dom/use.anchor';

const Container = styled('div')(
  ({ theme }) => css`
    padding: 0 ${theme.spacing(2)};
  `,
);

export const SizesRadio: React.FC = () => {
  const anchor = useAnchor();
  const active = EditorStore.useSelect((state) => state.size);

  function handleSelect(value: ScreenSize) {
    EditorStore.actions.setSize(value);
    anchor.remove();
  }

  return (
    <Container>
      <Button onMouseEnter={anchor.setAnchor}>{ScreenSize[active]}</Button>
      <Menu
        open={anchor.isActive}
        onClose={anchor.remove}
        anchorEl={anchor.value}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {[
          { value: ScreenSize.DESKTOP, label: 'Desktop' },
          { value: ScreenSize.MOBILE, label: 'Mobile' },
          { value: ScreenSize.TABLET, label: 'Tablet' },
        ].map((item) => (
          <MenuItem
            key={`screen-size-${item.value}`}
            selected={active === item.value}
            onClick={() => handleSelect(item.value)}
          >
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
