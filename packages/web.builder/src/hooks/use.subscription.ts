import * as React from 'react';

type Unsubscribe = () => void;

/**
 * It takes a function that returns an unsubscribe function, and it calls that function when the
 * component mounts, and it calls the returned unsubscribe function when the component unmounts
 */
export function useSubscription(
  fn: () => Unsubscribe,
  deps: React.DependencyList = [],
) {
  React.useEffect(() => {
    const unsubscribe = fn();
    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
