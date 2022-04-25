import '../scripts/wdyr';

import { AppProps, WithSEO, createEmotionCache, theme } from '@valhalla/react';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { MainLayout } from '@thor/layout/main';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const ComponentLayout = Component['Layout'] ?? MainLayout;
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextSeo
        titleTemplate="%s | SixtyNine"
        title={SEO?.title}
        description={SEO?.description}
        noindex={SEO?.noIndex}
        nofollow={SEO?.noFollow}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ComponentLayout>
          <Component {...pageProps} />
        </ComponentLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
