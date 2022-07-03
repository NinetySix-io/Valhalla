import * as React from 'react';

import { ListItemButton, styled } from '@mui/material';

type Props = React.ComponentProps<typeof ListItemButton>;

const Container = styled(ListItemButton)``;

export const MenuItem: React.FC<Props> = (props) => {
  return <Container {...props} />;
};
