import * as React from 'react';

import type { ComponentMeta } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { DropZone } from '../index';
import type { DroppedElement } from '../../types';
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

const Template: React.FC<Props> = ({ value, onUpdateItems, ...props }) => {
  const [items, setItems] = React.useState(value);
  const [rows, setRows] = React.useState(props.rowsCount);

  function handleRowsUpdate(value: number) {
    setRows(value);
  }

  function handleUpdateItems(nextItems: DroppedElement[]) {
    onUpdateItems?.(nextItems);
    setItems(nextItems);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <DropZone
          {...props}
          rowsCount={rows}
          value={items}
          onUpdateItems={handleUpdateItems}
          onRowExpand={handleRowsUpdate}
        />
      </Container>
    </DndProvider>
  );
};

export const Default = Template.bind({});
const args: Props = {
  rowsCount: 10,
  columnsCount: 24,
  value: [
    {
      id: uniqueId('item'),
      type: 'text',
      value: '<span>test<span/>',
      x: 4,
      y: 5,
      xSpan: 3,
      ySpan: 1,
    },
    // {
    //   id: uniqueId('item'),
    //   type: 'text',
    //   value: '<span>test 2<span/>',
    //   x: 0,
    //   y: 0,
    //   xSpan: 3,
    //   ySpan: 3,
    // },
  ],
};

Default.args = args;
export default Meta;
