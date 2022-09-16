import type { ApolloClient } from '@apollo/client';
import { createApolloClient } from '@app/apollo/create.client';
import { createNextPlugin } from '../create.plugin';
import type { GlobalStore } from './with.global.store';

/**
 * It creates an Apollo Client instance and attaches it to the context object
 */
export const withApollo = createNextPlugin<{
  apolloClient: ApolloClient<unknown>;
  globalStore: GlobalStore;
}>((ctx) => {
  const headers = ctx.isSsr
    ? (ctx.ssrCtx.req.headers as Record<string, string>)
    : undefined;

  const apolloClient = createApolloClient({
    headers,
    getAccessToken: () => ctx.globalStore.getState().Meta.accessToken,
  });

  ctx.apolloClient = apolloClient;
  ctx.onPageProps(() => ({
    apolloState: apolloClient.cache.extract(),
  }));

  return ctx;
});
