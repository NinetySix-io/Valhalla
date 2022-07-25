import * as React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { cProps } from '@valhalla/web.react';

type Props = cProps<{
  title: string;
}>;

export const FormContainer: React.FC<Props> = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid item xs={12} md={6} height={500}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          marginBottom={6}
        >
          <Typography variant="h1">{title}</Typography>
        </Box>
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};
