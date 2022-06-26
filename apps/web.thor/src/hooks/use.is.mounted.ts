import * as React from 'react';

/**
 * It returns a function that returns true if the component is mounted, and false if it's unmounted
 * @returns A function that returns a boolean value.
 */
export function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return React.useCallback(() => isMounted.current, []);
}
