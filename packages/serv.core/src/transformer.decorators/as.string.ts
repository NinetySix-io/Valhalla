import { Transform } from 'class-transformer';

/**
 * It returns the stringified version of the value, or the value itself if it's falsy
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringify(value: any): string {
  return value ? String(value) : value;
}

/**
 * It takes a value and returns a string representation of that value
 * @returns A function that takes a single argument, which is a property decorator.
 */
export function AsString(): PropertyDecorator {
  return Transform(({ obj, key }) => {
    return stringify(obj[key]);
  });
}
