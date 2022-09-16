import { TenantMainLayout } from '@app/layout/tenant.main';
import { getSingleUse } from '@app/lib/get.single.use';
import { makeSitePath } from '@app/lib/router.utils/path.builder';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import type { View } from '@app/types/next';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SiteView: View = () => {
  const router = useRouter();
  const siteId = getSingleUse(router.query.siteId);

  return (
    <div>
      <Link
        passHref
        href={{
          pathname: `${makeSitePath(siteId)}/pages`,
          query: {
            auto: true,
          },
        }}
      >
        <Button>Open Editor</Button>
      </Link>
    </div>
  );
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([withApollo, withOrgContext]);

SiteView.Layout = TenantMainLayout;

export default SiteView;
