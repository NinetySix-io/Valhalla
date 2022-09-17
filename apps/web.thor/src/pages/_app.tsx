import '@app/scripts/mui.classnames';

import { createEmotionCache, theme } from '@valhalla/web.react';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from '@valhalla/web.react';
import { AuthRedirectProvider } from '@app/components/auth.redirect.provider';
import { BaseLayout } from '@app/layout/base';
import type { BasicObject } from '@valhalla/utilities';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import type { NormalizedCacheObject } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import type { View } from '@app/types/next/page';
import { useApollo } from '@app/apollo/use.apollo';
import { useTenantHydrate } from '@app/hooks/hydrate/use.tenant.hydrate';

// import '@app/scripts/wdyr';

const clientSideEmotionCache = createEmotionCache();

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/apple-touch-icon_zj5zsd.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/favicon-32x32_pbvsqt.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/favicon-16x16_whljqj.png"
        />
        <link
          rel="mask-icon"
          href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/safari-pinned-tab_udiyvz.svg"
          color="#000000"
        />
        <meta name="apple-mobile-web-app-title" content="NinetySix" />
        <meta name="application-name" content="NinetySix" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="manifest"
          href="https://res.cloudinary.com/ninetysix-io/raw/upload/v1650834210/NinetySix/Site/site_dwepzp.webmanifest"
        />
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
