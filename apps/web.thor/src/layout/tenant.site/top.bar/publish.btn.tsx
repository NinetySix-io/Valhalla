import * as React from 'react';

import { Button, Menu, MenuItem } from '@mui/material';

import { useAnchor } from '@app/hooks/dom/use.anchor';

export const PublishBtn: React.FC = () => {
  const anchor = useAnchor();

  return (
    <React.Fragment>
      <Button variant="contained" onClick={anchor.setAnchor}>
        Publish
      </Button>
      <Menu
        anchorEl={anchor.value}
        onClose={anchor.remove}
        open={anchor.isActive}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>TODO</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
