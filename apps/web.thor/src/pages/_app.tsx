import { SiteFavicon } from '@app/components/site.favicon';
import '@app/scripts/mui.classnames';
import '@app/scripts/wdyr';
import type { AppProps } from '@valhalla/web.react';
import { createEmotionCache, theme } from '@valhalla/web.react';

import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@app/apollo/use.apollo';
import { AuthRedirectProvider } from '@app/components/auth.redirect.provider';
import { BaseLayout } from '@app/layout/base';
import type { View } from '@app/types/next/page';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import type { BasicObject } from '@valhalla/utilities';
import { useTenantHydrate } from '@app/hooks/hydrate/use.tenant.hydrate';

const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function App({
  Component,
  pageProps,
}: AppProps<{ apolloState: NormalizedCacheObject } & BasicObject>) {
  useTenantHydrate(pageProps);

  const Page = Component as View;
  const Layout = Page.Layout ?? BaseLayout;
  const isProtected = !Page.isUnprotected;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SiteFavicon />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <AuthRedirectProvider isProtected={isProtected}>
            <Layout SEO={pageProps?.SEO}>
              <Page {...pageProps} />
            </Layout>
          </AuthRedirectProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
