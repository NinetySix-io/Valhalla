import * as React from 'react';

import { BaseLayout } from '../base';
import { Layout } from '@app/types/next';
import { LoadingBlock } from '@app/components/loading.block';
import { TopBar } from './top.bar';
import { cProps } from '@valhalla/react';
import { styled } from '@mui/material';
import { useSiteHydrate } from '@app/hooks/hydrate/use.site.hydrate';
import { useTenantSEO } from '@app/hooks/use.tenant.seo.title';

type Props = cProps;

const Body = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

export const TenantSiteLayout: Layout<Props> = ({ children, SEO: _seo }) => {
  const SEO = useTenantSEO(_seo);
  const site = useSiteHydrate();

  return (
    <BaseLayout SEO={SEO}>
      <LoadingBlock isReady={Boolean(site.data)}>
        <TopBar />
        <Body>{children}</Body>
      </LoadingBlock>
    </BaseLayout>
  );
};
