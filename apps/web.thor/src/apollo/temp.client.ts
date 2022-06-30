import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  InMemoryCache,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';

import { IncomingHttpHeaders } from 'http';
import { authRedirectLink } from './auth.redirect.link';
import { createHttpLink } from './http.link';

export class TemporaryApolloClient extends ApolloClient<NormalizedCacheObject> {
  constructor(options: {
    uri: string;
    headers?: Record<string, string> | IncomingHttpHeaders;
  }) {
    super({
      link: ApolloLink.from([
        authRedirectLink,
        createHttpLink(options.uri, options.headers as Record<string, string>),
      ]),
      uri: options.uri,
      cache: new InMemoryCache(),
    });
  }

  query<T, TVariables = OperationVariables>({
    query,
    fetchPolicy = 'no-cache',
    ...props
  }: QueryOptions<TVariables, T>): Promise<ApolloQueryResult<T>> {
    return super.query({
      ...props,
      query,
      fetchPolicy,
    });
  }

  mutate<TData, TVariables = OperationVariables, TContext = DefaultContext>({
    mutation,
    fetchPolicy = 'no-cache',
    ...props
  }: MutationOptions<
    TData,
    TVariables,
    TContext,
    ApolloCache<unknown>
  >): Promise<
    FetchResult<TData, Record<string, unknown>, Record<string, unknown>>
  > {
    return super.mutate({
      mutation,
      fetchPolicy,
      ...props,
    });
  }
}
