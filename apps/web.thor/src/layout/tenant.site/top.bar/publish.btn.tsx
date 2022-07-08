import * as React from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import { FaSolid, Icon } from '@valhalla/react';

import { useAnchor } from '@app/hooks/dom/use.anchor';

export const PublishBtn: React.FC = () => {
  const anchor = useAnchor();

  return (
    <React.Fragment>
      <Button
        variant="contained"
        endIcon={<Icon icon={FaSolid.faChevronDown} />}
        onClick={anchor.setAnchor}
      >
        Publish
      </Button>
      <Menu
        anchorEl={anchor.value}
        onClose={anchor.clearAnchor}
        open={anchor.visible}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>TODO</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
