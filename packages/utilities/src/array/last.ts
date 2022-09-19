/**
 * "If the list is empty, return null, otherwise return the last element of the list."
 */
export function last<T>(list: T[]) {
  if (list.length === 0) {
    return null;
  }

  return list[list.length - 1];
}
