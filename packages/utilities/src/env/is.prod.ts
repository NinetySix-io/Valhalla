/**
 * If process is defined, return true if process.env.NODE_ENV is 'production', otherwise return false.
 */
export function isProd(): boolean {
  if (typeof process === 'undefined') {
    throw new Error('process is not defined');
  }

  return process.env.NODE_ENV === 'production';
}
