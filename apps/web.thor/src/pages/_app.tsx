import '../scripts/wdyr';

import {
  AppProps,
  SiteFavicon,
  WithSEO,
  createEmotionCache,
  theme,
} from '@valhalla/react';

import { ApolloProvider } from '@apollo/client';
import { AuthRedirectProvider } from '@app/components/auth.redirect.provider';
import { BaseLayout } from '@app/layout/base';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { Page as PageType } from '@app/types/next/page';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { useApollo } from '@app/apollo/use.apollo';
import { useReduxHydration } from '@app/redux/with.redux';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, ...props }: AppProps) {
  const store = useReduxHydration(props);
  const pageProps = props.pageProps;
  const SEO: WithSEO<unknown>['SEO'] = pageProps?.SEO;
  const Page = Component as PageType;
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
        <ReduxProvider store={store}>
          <ApolloProvider client={apolloClient}>
            <AuthRedirectProvider isProtected={isProtected}>
              <Layout SEO={SEO}>
                <Page {...pageProps} />
              </Layout>
            </AuthRedirectProvider>
          </ApolloProvider>
        </ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
