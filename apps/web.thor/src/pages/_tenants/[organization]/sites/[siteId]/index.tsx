import { Button } from '@mui/material';
import Link from 'next/link';
import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useRouter } from 'next/router';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

const SitePage: Page = () => {
  const router = useRouter();
  return (
    <div>
      <Link passHref href={`/sites/${router.query.siteId}/editor`}>
        <Button>Open Editor</Button>
      </Link>
    </div>
  );
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([
  withApollo,
  withRedux,
  withOrgContext,
]);

SitePage.Layout = TenantMainLayout;

export default SitePage;
