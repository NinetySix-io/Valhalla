import '../scripts/wdyr';

import {
  AppProps,
  SiteFavicon,
  WithSEO,
  createEmotionCache,
  theme,
} from '@valhalla/react';

import { ApolloProvider } from '@apollo/client';
import { BaseLayout } from '@app/layout/base';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { useApollo } from '@app/apollo/use.apollo';
import { useReduxHydration } from '@app/redux/with.redux';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, ...props }: AppProps) {
  const store = useReduxHydration(props);
  const pageProps = props.pageProps;
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;
  const Layout = Component['Layout'] ?? BaseLayout;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SiteFavicon />
      </Head>
      <NextSeo
        titleTemplate="%s | NinetySix"
        {...(SEO ?? {})}
        noindex
        nofollow
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
