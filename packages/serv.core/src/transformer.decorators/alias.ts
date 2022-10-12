import { Transform } from 'class-transformer';

/**
 * It takes a key and an optional transform function, and returns a decorator that transforms the value
 * of the key using the transform function
 */
export function Alias(
  key: string,
  options?: {
    transform?: (value: unknown) => unknown;
  },
): PropertyDecorator {
  return Transform(({ obj }) => {
    return options?.transform?.(obj[key]) ?? obj[key];
  });
}
