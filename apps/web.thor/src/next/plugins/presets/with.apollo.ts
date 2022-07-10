import { ApolloClient } from '@apollo/client';
import { createApolloClient } from '@app/apollo/create.client';
import { createNextPlugin } from '../create.plugin';

/**
 * It creates an Apollo Client instance and attaches it to the context object
 */
export const withApollo = createNextPlugin<{
  apolloClient: ApolloClient<unknown>;
}>((ctx) => {
  const headers = ctx.isSsr
    ? (ctx.ssrCtx.req.headers as Record<string, string>)
    : undefined;

  const apolloClient = createApolloClient({ headers });

  ctx.apolloClient = apolloClient;
  ctx.onPageProps(() => ({ apolloState: apolloClient.cache.extract() }));

  return ctx;
});
