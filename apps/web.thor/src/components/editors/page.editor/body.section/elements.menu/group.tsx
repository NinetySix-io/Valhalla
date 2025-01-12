import * as React from 'react';

import { Grid, Stack, Typography, css, styled } from '@mui/material';

const Container = styled(Stack)(() => css``);

type Props = React.PropsWithChildren<{ title: string }>;

export const ElementMenuGroup: React.FC<Props> = ({ title, children }) => {
  return (
    <Container direction="column" spacing={0.5}>
      {title && (
        <Typography fontSize="small" fontWeight={'bold'}>
          {title}
        </Typography>
      )}
      <Grid container spacing={0.5}>
        {children}
      </Grid>
    </Container>
  );
};
