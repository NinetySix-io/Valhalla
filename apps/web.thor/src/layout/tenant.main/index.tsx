import { css, styled } from '@mui/material';

import { BaseLayout } from '../base';
import { Layout } from '@app/types/next';
import { LayoutBody } from '@app/layout/base/body';
import { LoadingBlock } from '@app/components/loading.block';
import { Sidebar } from './side.bar';
import { cProps } from '@valhalla/react';
import { useOrgMembershipHydrate } from '@app/hooks/hydrate/use.org.hydrate';
import { useTenantSEO } from '@app/hooks/use.tenant.seo.title';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
`;

const Content = styled(LayoutBody)(
  ({ theme }) => css`
    flex-grow: 1;
    padding: ${theme.spacing(1)};
  `,
);

type Props = cProps;

const sidebarWidth = 60;
export const TenantMainLayout: Layout<Props> = ({ children, SEO: _seo }) => {
  const SEO = useTenantSEO(_seo);
  const memberships = useOrgMembershipHydrate();

  return (
    <BaseLayout SEO={SEO}>
      <Container>
        <Sidebar initialWidth={sidebarWidth} />
        <LoadingBlock isReady={Boolean(memberships.data)}>
          <Content style={{ marginLeft: sidebarWidth }}>{children}</Content>
        </LoadingBlock>
      </Container>
    </BaseLayout>
  );
};
