import '../scripts/wdyr';

import {
  AppProps,
  SiteFavicon,
  WithSEO,
  createEmotionCache,
  theme,
} from '@valhalla/react';

import { AccessTokenProvider } from '@app/components/access.token.provider';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { MainLayout } from '@app/layout/main';
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
  const Layout = Component['Layout'] ?? MainLayout;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <SiteFavicon />
      </Head>
      <NextSeo titleTemplate="%s | NinetySix" {...(SEO ?? {})} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>
          <ApolloProvider client={apolloClient}>
            <AccessTokenProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AccessTokenProvider>
          </ApolloProvider>
        </ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
