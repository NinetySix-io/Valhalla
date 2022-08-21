import { useDragDropManager } from 'react-dnd';
import { useSubscription } from './use.subscription';

type Monitor = ReturnType<ReturnType<typeof useDragDropManager>['getMonitor']>;

export function useDragMonitorOffset(cb: (monitor: Monitor) => void) {
  const monitor = useDragDropManager().getMonitor();

  useSubscription(() => {
    return monitor.subscribeToOffsetChange(() => {
      cb(monitor);
    });
  }, [monitor, cb]);
}
