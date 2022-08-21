import * as React from 'react';

import { builderEvents } from '../lib/events';
import { useCellClamp } from '../hooks/use.cell.clamp';
import { useDragMonitorOffset } from '../hooks/use.drag.monitor';
import { useZoneContext } from '../context';

export const Resizer: React.FC = () => {
  const cellClamp = useCellClamp(Infinity);
  const current = useZoneContext().rowsCount;

  useDragMonitorOffset((monitor) => {
    const offset = monitor.getSourceClientOffset();
    if (offset) {
      const nextRows = cellClamp(offset.y, 0);
      if (nextRows > current) {
        builderEvents.emit('gridRowsUpdate', nextRows);
      }
    }
  });

  return null;
};
