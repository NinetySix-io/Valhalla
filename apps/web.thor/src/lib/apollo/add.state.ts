import { ApolloClient } from '@apollo/client';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export function addApolloState(
  client: ApolloClient<unknown>,
  pageProps: Record<string, unknown>,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
