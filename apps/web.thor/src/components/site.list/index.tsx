import * as React from 'react';

import { Container, SiteCard } from './styles';

import Link from 'next/link';
import { Typography } from '@mui/material';
import type { cProps } from '@valhalla/web.react';
import { makeSitePath } from '@app/lib/router.utils/path.builder';
import { useGetSitesQuery } from '@app/generated/valhalla.gql';

type Props = cProps;

export const SiteList: React.FC<Props> = () => {
  const sites = useGetSitesQuery();

  return (
    <Container>
      {sites.data?.siteByOwner.map((site) => (
        <Link passHref key={site.id} href={{ pathname: makeSitePath(site.id) }}>
          <SiteCard>
            <Typography>{site.name}</Typography>
          </SiteCard>
        </Link>
      ))}
    </Container>
  );
};
