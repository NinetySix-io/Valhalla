import * as React from 'react';

import { DragLayer } from './drag.layer';
import { DragShadow } from './shadow';
import { SelectionBox } from './selection.box';
import { SelectionsOverlay } from './selections.overlay';

export const DragProcessors: React.FC = () => {
  return (
    <React.Fragment>
      <DragShadow />
      <DragLayer />
      <SelectionsOverlay />
      <SelectionBox />
    </React.Fragment>
  );
};
