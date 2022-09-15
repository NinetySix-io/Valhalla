import * as React from 'react';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import type { cProps } from '@valhalla/web.react';
import { useGetAccountQuery } from '@app/generated/valhalla.gql';
import { useLogout } from '@app/hooks/use.logout';

type Props = cProps;

export const AccountBtn: React.FC<Props> = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement>();
  const logout = useLogout();
  const isOpen = Boolean(anchor);
  const account = useGetAccountQuery().data?.account;

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchor(event.currentTarget);
  }

  if (!account) {
    return null;
  }

  return (
    <Box>
      <IconButton onClick={handleClick} size="small">
        <Avatar variant="rounded">{account.firstName[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        PaperProps={{ elevation: 4 }}
      >
        <MenuItem>
          <Typography>{account.displayName}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout.execute} disabled={logout.loading}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
