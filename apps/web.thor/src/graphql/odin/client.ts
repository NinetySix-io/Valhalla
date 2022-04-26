import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { Environment } from '@web.thor/env';

const link = createHttpLink({
  uri: Environment.variables.SERVER + '/graphql',
  credentials: 'same-origin',
});

export const odinClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
