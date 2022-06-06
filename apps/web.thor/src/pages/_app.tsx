import '../scripts/wdyr';

import {
  AppProps,
  SiteFavicon,
  WithSEO,
  createEmotionCache,
  theme,
} from '@valhalla/react';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { MainLayout } from '@app/layout/main';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from '@mui/material/styles';
import { useApollo } from '@app/lib/apollo';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;
  const Layout = Component['Layout'] ?? MainLayout;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SiteFavicon />
      </Head>
      <NextSeo titleTemplate="%s | NinetySix" {...(SEO ?? {})} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
