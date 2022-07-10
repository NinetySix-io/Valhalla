/**
 * If the target is an array, return the first element, otherwise return the target.
 * @param {T | T[]} target - T | T[]
 * @returns The first element of the array.
 */
export function getSingleUse<T>(target: T | T[]) {
  return Array.isArray(target) ? target[0] : target;
}
