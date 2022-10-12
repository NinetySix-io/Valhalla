import * as React from 'react';

import { Box, Typography } from '@mui/material';

import Image from 'next/image';
import type { Organization } from '@app/generated/valhalla.gql';
import type { cProps } from '@valhalla/web.react';

type Props = cProps<{
  organization: Pick<Organization, 'name' | 'logoUrl'>;
}>;

export const OrganizationLogo: React.FC<Props> = ({
  organization,
  ...props
}) => {
  const alt = `${organization.name} Logo`;

  return (
    <Box
      {...props}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      {organization.logoUrl ? (
        <Image alt={alt} src={organization.logoUrl} layout="fill" />
      ) : (
        <Typography variant="h1" component="h6">
          {organization.name[0]}
        </Typography>
      )}
    </Box>
  );
};
