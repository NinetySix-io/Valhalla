/**
 * Build comparator function that compares object's id to given id
 */
export function compareById<ID, T extends { id: ID }>(id: ID, isEqual = true) {
  return (entry: T): boolean => (isEqual ? entry.id === id : entry.id !== id);
}
