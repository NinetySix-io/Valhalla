import type {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import type { IncomingHttpHeaders } from 'http';
import { authRedirectLink } from './auth.redirect.link';
import { buildHttpLink } from './http.link';

export class TemporaryApolloClient extends ApolloClient<NormalizedCacheObject> {
  constructor(options: {
    uri: string;
    headers?: Record<string, string> | IncomingHttpHeaders;
  }) {
    super({
      link: ApolloLink.from([
        authRedirectLink,
        buildHttpLink(options.uri, options.headers as Record<string, string>),
      ]),
      uri: options.uri,
      cache: new InMemoryCache(),
    });
  }

  override query<T, TVariables = OperationVariables>({
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

  override mutate<
    TData,
    TVariables = OperationVariables,
    TContext = DefaultContext,
  >({
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
