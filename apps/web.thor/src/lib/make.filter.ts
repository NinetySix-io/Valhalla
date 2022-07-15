/**
 * It takes an array of strings and returns a function that takes a property key and returns true if
 * the property key is not in the array of strings
 * @param {string[]} keys - string[] - an array of strings that represent the keys you want to filter
 * out
 * @returns A function that takes a property key and returns true if the property key is not in the
 * keys array.
 */
export function makeFilter(keys: string[]) {
  return (p: PropertyKey) => {
    return !keys.includes(p.toString());
  };
}
