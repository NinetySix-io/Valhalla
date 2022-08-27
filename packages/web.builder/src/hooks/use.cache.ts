import * as React from 'react';

/**
 * UseTemporalCache is a React hook that returns a cached value and a setter function for that value.
 */
export function useTemporalCache<T>(target: T) {
  const [value, setValue] = React.useState<T>(target);

  React.useEffect(() => {
    setValue(target);
  }, [target]);

  return [value, setValue] as const;
}
