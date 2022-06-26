import * as React from 'react';

import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { FaSolid, Icon, cProps, theme } from '@valhalla/react';

import { DynamicOrganizationCreateModal } from '../organization.create.modal/dynamic';
import { Environment } from '@app/env';
import Link from 'next/link';
import { OrganizationLogo } from '../organization.logo';
import { Section } from '../section';
import { useGetOrgsMembershipListQuery } from '@app/graphql/valhalla/generated.gql';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

const CreateButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2;
  width: 300px;
  height: 150px;
  min-width: 250px;
  border-color: ${theme.palette.grey[500]};
`;

const OrgCard = styled(Button)`
  height: 150px;
  width: 300px;
  min-width: 250px;
  aspect-ratio: 2;
  display: flex;
  flex-direction: column;
`;

const OrgLogo = styled(OrganizationLogo)`
  flex-grow: 1;
`;

const OrgMeta = styled(Box)``;

export const OrganizationSection: React.FC<Props> = () => {
  const [creating, setCreating] = React.useState(false);
  const domain = useReduxSelector((state) => state.meta.domain);
  const organizations = useGetOrgsMembershipListQuery();

  function buildOrgLink(slug: string) {
    if (Environment.isDev) {
      return `http://${slug}.${domain}`;
    }

    return `https://${slug}.${domain}`;
  }

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
          <IconButton size="small" onClick={() => organizations.refetch()}>
            <Icon fontSize={12} icon={FaSolid.faRotate} />
          </IconButton>
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
            <Icon fontSize={30} icon={FaSolid.faPlus} />
          </CreateButton>
          {organizations.data?.organizations.map((org) => (
            <Link passHref key={org.id} href={buildOrgLink(org.slug)}>
              <OrgCard variant="outlined">
                <OrgLogo organization={org} />
                <OrgMeta>
                  <Typography>{org.name}</Typography>
                </OrgMeta>
              </OrgCard>
            </Link>
          ))}
        </Stack>
      </Section>
    </React.Fragment>
  );
};
