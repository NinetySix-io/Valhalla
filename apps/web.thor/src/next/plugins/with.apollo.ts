import { ApolloClient } from '@apollo/client';
import { createApolloClient } from '@app/apollo/create.client';
import { createSsrPlugin } from './create.plugin';

export const withApollo = () =>
  createSsrPlugin<{ apolloClient: ApolloClient<unknown> }>(async (ctx) => {
    const headers = ctx.req.headers as Record<string, string>;
    const apolloClient = createApolloClient({ headers });
    ctx.apolloClient = apolloClient;
    ctx.onPageProps(() => ({ apolloState: apolloClient.cache.extract() }));
    return ctx;
  });
