import * as React from 'react';

import { DndProvider, DropTargetMonitor } from 'react-dnd';
import { DroppableElement, DroppedItem } from '../../types';

import { ComponentMeta } from '@storybook/react';
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
    item: DroppedItem,
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
  accepts: 'element',
  rowsCount: 20,
  columnsCount: 20,
  value: [
    {
      id: uniqueId('item'),
      type: 'text',
      value: '<p>test</>',
      topLeftX: 0,
      topLeftY: 0,
      widthPct: 20,
      heightPct: 20,
    },
  ],
};

Default.args = args;
export default Meta;
