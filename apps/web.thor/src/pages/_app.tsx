import '../scripts/wdyr';

import {
  AppProps,
  SiteFavicon,
  WithSEO,
  createEmotionCache,
  theme,
} from '@valhalla/react';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { MainLayout } from '@web.thor/layout/main';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;
  const Layout = Component['Layout'] ?? MainLayout;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SiteFavicon />
      </Head>
      <NextSeo
        titleTemplate="%s | NinetySix"
        title={SEO?.title}
        description={SEO?.description}
        noindex={SEO?.noIndex ?? true}
        nofollow={SEO?.noFollow ?? true}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
