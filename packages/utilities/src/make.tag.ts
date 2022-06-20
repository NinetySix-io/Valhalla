import { isNil } from './is.nil';

/**
 * It takes a string and a value, and returns a tag format
 * @param {string} key - The key of the tag.
 * @param {unknown} value - The value to be converted to a string.
 */
export function makeTag(key: string, value?: unknown) {
  if (isNil(value)) {
    return `[${key}]`;
  }

  return `[${key}:${value}]`;
}
