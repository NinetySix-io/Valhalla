import { useDragDropManager } from 'react-dnd';
import { useSubscription } from './use.subscription';

type Monitor = ReturnType<ReturnType<typeof useDragDropManager>['getMonitor']>;

/**
 * It subscribes to the offset change of the drag monitor and calls the callback function with the
 * monitor as the argument
 */
export function useDragMonitorOffset(cb: (monitor: Monitor) => void) {
  const monitor = useDragDropManager().getMonitor();

  useSubscription(() => {
    return monitor.subscribeToOffsetChange(() => {
      cb(monitor);
    });
  }, [monitor, cb]);
}
