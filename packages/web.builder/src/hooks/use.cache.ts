import * as React from 'react';

export function useTemporalCache<T>(target: T) {
  const [value, setValue] = React.useState<T>(target);

  React.useEffect(() => {
    setValue(target);
  }, [target]);

  return [value, setValue] as const;
}
