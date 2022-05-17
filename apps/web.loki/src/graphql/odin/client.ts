import { ApolloClient, InMemoryCache } from '@apollo/client';

import { Environment } from '@app/env';

export const odinClient = new ApolloClient({
  uri: Environment.variables.SERVER + '/graphql',
  cache: new InMemoryCache(),
});
