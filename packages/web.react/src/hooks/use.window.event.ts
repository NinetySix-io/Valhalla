import * as React from 'react';

/**
 * It adds an event listener to the window and returns a function that removes the event listener
 * @param {K} type - The event type.
 * @param callback - (this: Window, event: WindowEventMap[K]) => void,
 */
export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  handler: (this: Window, event: WindowEventMap[K]) => void,
) {
  React.useEffect(() => {
    window.addEventListener(type, handler);

    return () => {
      window.removeEventListener(type, handler);
    };
  }, [type, handler]);
}
