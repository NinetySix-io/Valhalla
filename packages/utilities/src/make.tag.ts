/**
 * It takes a string and a value, and returns a tag format
 */
export function makeTag(key: string, value?: unknown) {
  if (!value) {
    return `[${key}]`;
  }

  return `[${key}:${String(value)}]`;
}
