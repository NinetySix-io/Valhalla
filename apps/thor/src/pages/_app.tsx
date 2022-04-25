import '../scripts/wdyr';

import { createEmotionCache, theme } from '@valhalla/react';

import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { MainLayout } from '@thor/layout/main';
import { ThemeProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const ComponentLayout = Component['Layout'] ?? MainLayout;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ComponentLayout>
          <Component {...pageProps} />
        </ComponentLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
