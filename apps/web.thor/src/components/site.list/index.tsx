import * as React from 'react';

import { Button, Typography, styled } from '@mui/material';

import Link from 'next/link';
import { cProps } from '@valhalla/react';
import { useGetSitesQuery } from '@app/generated/valhalla.gql';

type Props = cProps;

export const SiteList: React.FC<Props> = () => {
  const sites = useGetSitesQuery();

  return (
    <Container>
      {sites.data?.getSiteList.map((site) => (
        <Link passHref key={site.id} href={`/sites/${site.id}`}>
          <SiteCard>
            <Typography>{site.name}</Typography>
          </SiteCard>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: row;
`;

const SiteCard = styled(Button)``;
