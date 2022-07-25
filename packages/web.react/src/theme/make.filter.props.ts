import { StyledOptions } from '@emotion/styled';

export function makeFilterProps(
  keys: string[],
  options: Omit<StyledOptions, 'shouldForwardProp'> = {},
): StyledOptions {
  return {
    ...options,
    shouldForwardProp: (propName) => !keys.includes(propName),
  };
}
