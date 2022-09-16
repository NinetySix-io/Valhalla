import * as React from 'react';

import { useGetFirstPageMutation } from '@app/generated/valhalla.gql';
import { useSiteHydrate } from '@app/hooks/hydrate/use.site.hydrate';
import { makePageEditorPath } from '@app/lib/router.utils/path.builder';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import type { View } from '@app/types/next';
import { useRouter } from 'next/router';

const PageListView: View = () => {
  const router = useRouter();
  const query = router.query;
  const site = useSiteHydrate();
  const siteId = site.data?.id;
  const [getFirstPage, { data: firstPage }] = useGetFirstPageMutation();

  React.useEffect(() => {
    if (query.auto) {
      getFirstPage({
        variables: {
          siteId,
        },
      });
    }
  }, [getFirstPage, query, siteId]);

  React.useEffect(() => {
    if (firstPage) {
      router.replace({
        pathname: makePageEditorPath({
          pageId: firstPage.getOrCreateFirstPage.id,
          siteId,
        }),
      });
    }
  }, [firstPage, router, siteId]);

  return <div>loading...</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([withApollo, withOrgContext]);

export default PageListView;
