import * as React from 'react';

import { Grid, Stack, Typography, css, styled } from '@mui/material';

import type { cProps } from '@valhalla/web.react';

const Container = styled(Stack)(() => css``);

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
