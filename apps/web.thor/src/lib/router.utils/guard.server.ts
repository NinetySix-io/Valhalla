import { Environment } from '@app/env';

/**
 * If the code is running on the server, throw an error.
 */
export function guardServerOnly() {
  if (!Environment.isServer) {
    throw new Error('This feature is only available on server side');
  }
}

/**
 * If we're on the server, throw an error.
 */
export function guardClientOnly() {
  if (Environment.isServer) {
    throw new Error('This feature is only available on client side');
  }
}
