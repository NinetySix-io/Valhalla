import { Container, Content } from './styles';

import { BaseLayout } from '../base';
import type { Layout } from '@app/types/next';
import { LoadingBlock } from '@app/components/loading.block';
import { Sidebar } from './side.bar';
import type { cProps } from '@valhalla/web.react';
import { useOrgMembershipHydrate } from '@app/hooks/hydrate/use.org.hydrate';
import { useTenantSEO } from '@app/hooks/use.tenant.seo.title';

type Props = cProps;

export const TenantMainLayout: Layout<Props> = ({ children, SEO: _seo }) => {
  const SEO = useTenantSEO(_seo);
  const memberships = useOrgMembershipHydrate();

  return (
    <BaseLayout SEO={SEO}>
      <Container>
        <Sidebar />
        <LoadingBlock isReady={Boolean(memberships.data)}>
          <Content>{children}</Content>
        </LoadingBlock>
      </Container>
    </BaseLayout>
  );
};
