/**
 * If process.env.NODE_ENV is not defined, then we're in development mode.
 */
export function isDev(): boolean {
  if (typeof process === 'undefined') {
    throw new Error('process is not defined');
  }

  return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
}
