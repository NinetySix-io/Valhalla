import { ApolloError } from '@apollo/client';
import { ModGraphQLErrorExtensions } from '@app/types/apollo';

const EXPIRED_REFRESH_TOKEN_CODE = 403 as const;
const EXPIRED_ACCESS_TOKEN_CODE = 401 as const;

/**
 * It returns true if the error is an instance of ApolloError
 */
export function isApolloError(error: Error): error is ApolloError {
  return 'graphQLErrors' in error;
}

/**
 * It checks if the error is an ApolloError and if it has a graphQLError with a statusCode that matches
 * the code passed in
 */
export function apolloErrorHasCode(error: ApolloError, code: number) {
  return (
    isApolloError(error) &&
    error.graphQLErrors.some(
      (e) =>
        (e.extensions as ModGraphQLErrorExtensions).response['statusCode'] ===
        code,
    )
  );
}

/**
 * It checks if the error code of the ApolloError is equal to the EXPIRED_REFRESH_TOKEN_CODE constant
 */
export function isRefreshTokenExpiredError(error: ApolloError) {
  return apolloErrorHasCode(error, EXPIRED_REFRESH_TOKEN_CODE);
}

/**
 * It checks if the error code of the ApolloError is equal to the EXPIRED_ACCESS_TOKEN_CODE constant
 */
export function isAccessTokenExpiredError(error: ApolloError) {
  return apolloErrorHasCode(error, EXPIRED_ACCESS_TOKEN_CODE);
}
