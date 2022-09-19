import type {
  BasicObject,
  EventsEmitter,
  IEventListener,
} from '@valhalla/utilities';

import { useSubscription } from '@valhalla/web.react';

export function useEmitter<E extends BasicObject>(emitter: EventsEmitter<E>) {
  /**
   * Hook to subscribe to given emitter's event
   */
  function useEvent<K extends keyof E>(
    eventK: K,
    onEvent: IEventListener<E[K]>,
  ) {
    return useSubscription(
      () => emitter.addListener(eventK, onEvent),
      [onEvent, eventK, emitter],
    );
  }

  return {
    client: emitter,
    useEvent,
  };
}
