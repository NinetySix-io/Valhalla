/**
 * It takes an array of strings and returns a function that takes a property key and returns true if
 * the property key is not in the array of strings
 */
export function makeFilter(keys: string[]) {
  return (p: PropertyKey) => {
    return !keys.includes(p.toString());
  };
}
