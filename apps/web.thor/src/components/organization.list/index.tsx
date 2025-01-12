import * as React from 'react';

import {
  Box,
  Button,
  Stack,
  Typography,
  css,
  styled,
  useTheme,
} from '@mui/material';

import { DynamicOrganizationCreateModal } from '../organization.create.modal/dynamic';
import { Environment } from '@app/env';
import Link from 'next/link';
import { OrganizationLogo } from '../organization.logo';
import { Section } from '../section';
import isNil from 'lodash.isnil';
import { useGetOrgsMembershipListQuery } from '@app/generated/valhalla.gql';

const CreateButton = styled(Button)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 2;
    width: 300px;
    height: 150px;
    min-width: 250px;
    border-color: ${theme.palette.grey[500]};
  `,
);

const OrgCard = styled(Button)<{ hasLogo: boolean }>`
  height: 150px;
  width: 300px;
  min-width: 250px;
  aspect-ratio: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-color: ${(p) =>
    p.hasLogo ? 'transparent' : p.theme.palette.grey[500]};
`;

const OrgLogo = styled(OrganizationLogo)`
  flex-grow: 1;
`;

const OrgMeta = styled(Box)`
  max-width: 100%;
`;

export const OrganizationList: React.FC = () => {
  const [creating, setCreating] = React.useState(false);
  const organizations = useGetOrgsMembershipListQuery();

  const theme = useTheme();

  return (
    <React.Fragment>
      <DynamicOrganizationCreateModal
        open={creating}
        onClose={() => setCreating(false)}
        onFinish={() => organizations.refetch()}
      />
      <Section
        title="Organizations"
        actions={
          <Button size="small" onClick={() => organizations.refetch()}>
            Reload
          </Button>
        }
      >
        <Stack
          paddingY={theme.spacing(1)}
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <CreateButton variant="outlined" onClick={() => setCreating(true)}>
            Create
          </CreateButton>
          {organizations.data?.organizationsByMemberships.map((org) => (
            <Link
              passHref
              key={org.id}
              href={Environment.getTenantUrl(org.slug)}
            >
              <OrgCard variant="outlined" hasLogo={!isNil(org.logoUrl)}>
                <OrgLogo organization={org} />
                <OrgMeta>
                  <Typography
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    align="center"
                  >
                    {org.name}
                  </Typography>
                </OrgMeta>
              </OrgCard>
            </Link>
          ))}
        </Stack>
      </Section>
    </React.Fragment>
  );
};
