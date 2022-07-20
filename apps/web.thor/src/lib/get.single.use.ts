/**
 * If the target is an array, return the first element, otherwise return the target.
 */
export function getSingleUse<T>(target: T | T[]) {
  return Array.isArray(target) ? target[0] : target;
}
