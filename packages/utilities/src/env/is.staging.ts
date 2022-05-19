/**
 * If process is defined and process.env.NODE_ENV is equal to 'staging', return true, otherwise return
 * false.
 */
export function isStaging(): boolean {
  if (typeof process === 'undefined') {
    throw new Error('process is not defined');
  }

  return process.env.NODE_ENV === 'staging';
}
