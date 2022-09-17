import { BaseLayout } from '../base';
import type { Layout } from '@app/types/next';
import { LoadingBlock } from '@app/components/loading.block';
import { TopBar } from './top.bar';
import { styled } from '@mui/material';
import { useSiteHydrate } from '@app/hooks/hydrate/use.site.hydrate';
import { useTenantSEO } from '@app/hooks/use.tenant.seo.title';

const Body = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TenantSiteLayout: Layout = ({ children, SEO: _seo }) => {
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
