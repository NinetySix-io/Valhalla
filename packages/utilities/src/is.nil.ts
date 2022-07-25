/**
 * If the target is undefined or null, return true, otherwise return false.
 */
export function isNil(target: unknown): target is undefined | null {
  return target === undefined || target === null;
}
