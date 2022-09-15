import * as React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import type { cProps } from '@valhalla/web.react';
import isEmpty from 'lodash.isempty';

type Props = cProps & {
  title: string;
  actions?: React.ReactElement | React.ReactElement[];
};

export const Section: React.FC<Props> = ({
  title,
  actions,
  children,
  ...props
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      maxWidth="100%"
      overflow="hidden"
      {...props}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography variant="h5">{title}</Typography>
        {!isEmpty(actions) && (
          <Stack direction="row" spacing={1}>
            {actions}
          </Stack>
        )}
      </Stack>
      <Box overflow="auto" maxWidth="100%">
        {children}
      </Box>
    </Box>
  );
};
