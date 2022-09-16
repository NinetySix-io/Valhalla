import * as React from 'react';

import type { View } from '@app/types/next';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makePageEditorPath } from '@app/lib/router.utils/path.builder';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useGetFirstPageMutation } from '@app/generated/valhalla.gql';
import { useRouter } from 'next/router';
import { useSiteHydrate } from '@app/hooks/hydrate/use.site.hydrate';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withGlobalStore } from '@app/next/plugins/presets/with.global.store';

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
export const getStaticProps = composeNextPlugins([
  withGlobalStore,
  withApollo,
  withOrgContext,
]);

export default PageListView;
