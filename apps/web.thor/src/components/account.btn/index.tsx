import * as React from 'react';

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { FaSolid, Icon, cProps } from '@valhalla/react';

import { useGetAccountQuery } from '@app/graphql/valhalla/generated.gql';
import { useLogout } from '@app/hooks/use.logout';

type Props = cProps;

export const AccountBtn: React.FC<Props> = () => {
  const [anchor, setAnchor] = React.useState<HTMLElement>();
  const logout = useLogout();
  const isOpen = Boolean(anchor);
  const account = useGetAccountQuery().data?.account;

  if (!account) {
    return null;
  }

  return (
    <div>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
        <Avatar variant="rounded">{account.firstName[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        PaperProps={{ elevation: 4 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
          <Typography>{account.displayName}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout.execute} disabled={logout.loading}>
          <ListItemIcon>
            <Icon icon={FaSolid.faArrowRightFromBracket} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
