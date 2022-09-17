import * as React from 'react';

import type { DecoratorFn } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const DndDecorator: DecoratorFn = (Story) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Story />
    </DndProvider>
  );
};
