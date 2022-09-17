import type { DocumentNode } from '@apollo/client';

/**
 * It takes a GraphQL query and a result, and returns a mock result for that query
 */
export function mockApolloQuery<T extends { data?: unknown }>(
  query: DocumentNode,
  result: T['data'],
) {
  return {
    request: {
      query,
      variables: {},
    },
    result: {
      data: result,
    },
  };
}

/**
 * It takes a GraphQL mutation, the variables for that mutation, and the result of that mutation, and
 * returns a mock Apollo mutation
 */
export function mockApolloMutation<V, T extends { data?: unknown }>(
  mutation: DocumentNode,
  variables: V,
  result: T['data'],
) {
  return {
    request: {
      query: mutation,
      variables,
    },
    result: {
      data: result,
    },
  };
}

/**
 * It takes an array of mock queries and returns an object that contains an apolloClient object with a
 * mocks property that contains the mock queries
 */
export function mockApollo(mockQueries: ReturnType<typeof mockApolloQuery>[]) {
  return {
    apolloClient: {
      mocks: mockQueries,
    },
  };
}
