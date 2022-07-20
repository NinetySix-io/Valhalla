import * as React from 'react';

import { Button, Grid, Stack, Typography, css, styled } from '@mui/material';

import { cProps } from '@valhalla/react';
import { useDrag } from 'react-dnd';

const Container = styled(Stack)(() => css``);

const Item = styled(Button)(
  ({ theme }) => css`
    justify-content: flex-start;

    svg {
      padding: 0 ${theme.spacing(1)};
    }
  `,
);

type Props = cProps<{ title: string }>;

export const ElementMenuGroup: React.FC<Props> = ({ title, children }) => {
  return (
    <Container direction="column" spacing={0.5}>
      <Typography fontSize="small" fontWeight={'bold'}>
        {title}
      </Typography>
      <Grid container>{children}</Grid>
    </Container>
  );
};

export const ElementMenuGroupItem: React.FC<{
  children: string;
}> = ({ children }) => {
  const [, drag] = useDrag(() => ({
    type: 'element',
    item: {
      id: children,
    },
  }));

  return (
    <Grid item md={6}>
      <Item disableRipple ref={drag} fullWidth>
        {children}
      </Item>
    </Grid>
  );
};
