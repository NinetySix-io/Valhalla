import * as React from 'react';

import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  css,
  styled,
} from '@mui/material';
import { ScreenSize, SiteEditorSlice } from '@app/redux/slices/editor';

import { ScreenSizeIcon } from '@app/components/screen.size';
import { useAnchor } from '@app/hooks/dom/use.anchor';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';

const Container = styled('div')(
  ({ theme }) => css`
    padding: 0 ${theme.spacing(2)};
  `,
);

export const SizesRadio: React.FC = () => {
  const dispatch = useDispatch();
  const anchor = useAnchor();
  const active = useReduxSelector((state) => state.SiteEditor.size);

  function handleSelect(value: ScreenSize) {
    dispatch(SiteEditorSlice.actions.setSize(value));
    anchor.remove();
  }

  return (
    <Container>
      <Button onMouseEnter={anchor.setAnchor}>
        <ScreenSizeIcon value={active} />
      </Button>
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
            <ListItemIcon>
              <ScreenSizeIcon value={item.value} />
            </ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
