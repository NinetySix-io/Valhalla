import { SiteFavicon } from '@app/components/site.favicon';
import '@app/scripts/mui.classnames';
import '@app/scripts/wdyr';
import * as React from 'react';
import type { AppProps, WithSEO } from '@valhalla/web.react';
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

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  ...props
}: AppProps<{
  apolloState: NormalizedCacheObject;
}>) {
  const pageProps = props.pageProps;
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;
  const Page = Component as View;
  const Layout = Page.Layout ?? BaseLayout;
  const isProtected = !Page.isUnprotected;
  const apolloClient = useApollo(pageProps);

  React.useEffect(() => {
    console.log({ props });
  }, [props]);

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
            <Layout SEO={SEO}>
              <Page {...pageProps} />
            </Layout>
          </AuthRedirectProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
