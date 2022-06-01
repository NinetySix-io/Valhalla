/**
 * If the target is not undefined and the target is not null, then the target is not undefined or null.
 * @param {unknown} target - unknown
 * @returns {boolean}
 */
export function isNil(target: unknown): target is undefined | null {
  return target === undefined || target === null;
}
