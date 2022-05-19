/**
 * If process is defined, and process.env.NODE_ENV is equal to 'test', then return true, otherwise
 * return false.
 */
export function isTest(): boolean {
  if (typeof process === 'undefined') {
    throw new Error('process is not defined');
  }

  return process.env.NODE_ENV === 'test';
}
