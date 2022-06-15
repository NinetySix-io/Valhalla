import { ApolloError } from '@apollo/client';

const EXPIRED_REFRESH_TOKEN_CODE = 403 as const;
const EXPIRED_ACCESS_TOKEN_CODE = 401 as const;

/**
 * It returns true if the error is an instance of ApolloError
 * @param {Error} error - Error
 * @returns A function that takes an error and returns a boolean.
 */
export function isApolloError(error: Error): error is ApolloError {
  return 'graphQLErrors' in error;
}

/**
 * It checks if the error is an ApolloError and if it has a graphQLError with a statusCode that matches
 * the code passed in
 * @param {ApolloError} error - ApolloError - The error object that is returned from the Apollo Client.
 * @param {number} code - The status code you want to check for.
 * @returns A function that takes in an error and a code and returns a boolean.
 */
export function apolloErrorHasCode(error: ApolloError, code: number) {
  return (
    isApolloError(error) &&
    error.graphQLErrors.some(
      (e) => e.extensions.response['statusCode'] === code,
    )
  );
}

/**
 * It checks if the error code of the ApolloError is equal to the EXPIRED_REFRESH_TOKEN_CODE constant
 * @param {ApolloError} error - ApolloError - The error object that was thrown by the Apollo client.
 * @returns A function that takes an ApolloError and returns a boolean.
 */
export function isRefreshTokenExpiredError(error: ApolloError) {
  return apolloErrorHasCode(error, EXPIRED_REFRESH_TOKEN_CODE);
}

/**
 * It checks if the error code of the ApolloError is equal to the EXPIRED_ACCESS_TOKEN_CODE constant
 * @param {ApolloError} error - ApolloError - The error object that was thrown by the Apollo client.
 * @returns A function that takes an ApolloError and returns a boolean.
 */
export function isAccessTokenExpiredError(error: ApolloError) {
  return apolloErrorHasCode(error, EXPIRED_ACCESS_TOKEN_CODE);
}
