import * as React from 'react';

import type { DroppableElement, DroppedElement } from '../../types';

import type { ComponentMeta } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import type { DropTargetMonitor } from 'react-dnd';
import { DropZone } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from '@mui/material';
import { uniqueId } from '@valhalla/utilities';

type ComponentType = typeof DropZone;
type Props = React.ComponentProps<ComponentType>;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/DropZone',
  component: DropZone,
};

const Container = styled('div')`
  padding: 10px;
`;

const Template: React.FC<Props> = ({ value, onUpdateItem, ...props }) => {
  const [items, setItems] = React.useState(value);

  function handleUpdateItem(
    item: DroppedElement,
    monitor: DropTargetMonitor<DroppableElement, unknown>,
  ) {
    onUpdateItem?.(item, monitor);

    if (!items) {
      return;
    }

    const index = items?.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      const nextItems = [...items];
      nextItems[index] = item;
      setItems(nextItems);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <DropZone {...props} value={items} onUpdateItem={handleUpdateItem} />
      </Container>
    </DndProvider>
  );
};

export const Default = Template.bind({});
const args: Props = {
  rowsCount: 20,
  columnsCount: 20,
  value: [
    {
      id: uniqueId('item'),
      type: 'text',
      value: '<span>test<span/>',
      x: 1,
      y: 1,
      xSpan: 3,
      ySpan: 1,
    },
  ],
};

Default.args = args;
export default Meta;
