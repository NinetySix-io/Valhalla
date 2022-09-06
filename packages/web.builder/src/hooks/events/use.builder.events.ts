import type { BuilderEvents } from '../../lib/events';
import { builderEvents } from '../../lib/events';
import { useSubscription } from '../use.subscription';

/**
 * It allows you to subscribe to builder events
 */
export function useBuilderEvents<
  K extends keyof BuilderEvents,
  CB extends (value: BuilderEvents[K]) => void,
>(event: K, callback?: CB) {
  return useSubscription(
    () => builderEvents.addListener(event, callback),
    [callback, event],
  );
}
