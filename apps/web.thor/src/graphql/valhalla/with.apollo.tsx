import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';

import { Environment } from '@app/env';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { nanoid } from 'nanoid';
import nextWithApollo from 'next-with-apollo';
import { withLayout } from '@app/middlewares/with.layout';

export const withApollo = nextWithApollo(
  ({ initialState, headers, ...rest }) => {
    const httpLink = new HttpLink({
      uri: Environment.GQL_SERVER,
      headers: { ...headers },
      credentials: 'include',
    });

    return new ApolloClient({
      ssrMode: Environment.isServer,
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
      // A hack to get ctx oin the page's props on the initial render
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultOptions: { ...rest },
    });
  },
  {
    render: ({ Page, props }) => {
      return withLayout(Page, () => (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...props.apollo.defaultOptions.ctx} />
        </ApolloProvider>
      ));
    },
  },
);

export const withApolloWithSubscriptions = nextWithApollo(
  ({ initialState, headers, ...rest }) => {
    const clientId = nanoid();

    const wsLink = !Environment.isServer
      ? new WebSocketLink({
          uri: Environment.GQL_SERVER,
          options: {
            reconnect: true,
            connectionParams: {
              clientId,
            },
          },
        })
      : null;

    const httpLink = new HttpLink({
      uri: Environment.GQL_SERVER,
      headers: {
        ...headers,
      },
      credentials: 'include',
    });

    /*
     * Only create a split link on the browser
     * The server can not use websockets and is therefore
     * always a http link
     */
    const splitLink = !Environment.isServer
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink,
        )
      : httpLink;

    return new ApolloClient({
      ssrMode: Environment.isServer,
      link: splitLink,
      cache: new InMemoryCache().restore(initialState || {}),
      // A hack to get ctx oin the page's props on the initial render
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defaultOptions: { ...rest, clientId },
    });
  },
  {
    render: ({ Page, props }) => {
      return withLayout(Page, () => (
        <ApolloProvider client={props.apollo}>
          <Page
            {...props}
            {...props.apollo.defaultOptions.ctx}
            clientId={props.apollo.defaultOptions.clientId}
          />
        </ApolloProvider>
      ));
    },
  },
);
