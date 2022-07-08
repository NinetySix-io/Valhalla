import { BaseLayout } from '../base';
import { Layout } from '@app/types/next';
import { LayoutBody } from '../base/body';
import { LoadingBlock } from '@app/components/loading.block';
import { TopBar } from './top.bar';
import { cProps } from '@valhalla/react';
import { useSiteHydrate } from '@app/hooks/use.site.hydrate';
import { useTenantSEO } from '@app/hooks/use.tenant.seo.title';

type Props = cProps;

export const TenantSiteLayout: Layout<Props> = ({ children, SEO: _seo }) => {
  const SEO = useTenantSEO(_seo);
  const site = useSiteHydrate();

  return (
    <BaseLayout SEO={SEO}>
      <LoadingBlock isReady={Boolean(site.data)}>
        <TopBar />
        <LayoutBody>{children}</LayoutBody>
      </LoadingBlock>
    </BaseLayout>
  );
};
