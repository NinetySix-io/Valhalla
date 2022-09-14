import * as React from 'react';

import type { Droppable, DroppedElement } from '../../types';

import type { ComponentMeta } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { DropItem } from '../../item';
import { DropZone } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from '@mui/material';

type ComponentType = typeof DropZone;
type Element = DroppedElement<Droppable<{ value: string }>>;
type Props = React.ComponentProps<ComponentType> & {
  elements: Element[];
  onFocus?: (element: Element) => void;
};

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/DropZone',
  component: DropZone,
};

const Container = styled('div')`
  padding: 10px;
`;

const Template: React.FC<Props> = ({
  elements: _elements,
  onUpdateItems,
  onFocus,
  ...props
}) => {
  const [elements, setElements] = React.useState(_elements);
  const [rows, setRows] = React.useState(props.rowsCount);

  function handleRowsUpdate(value: number) {
    setRows(value);
  }

  function handleUpdateItems(nextItems: Element[]) {
    onUpdateItems?.(nextItems);
    setElements(nextItems);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <DropZone
          {...props}
          rowsCount={rows}
          onUpdateItems={handleUpdateItems}
          onRowExpand={handleRowsUpdate}
        >
          {elements.map((item) => (
            <DropItem
              key={item.id}
              element={item}
              onFocus={() => onFocus?.(item)}
            >
              <div
                // skipcq: JS-0440
                dangerouslySetInnerHTML={{
                  __html: item.value,
                }}
              />
            </DropItem>
          ))}
        </DropZone>
      </Container>
    </DndProvider>
  );
};

export const Default = Template.bind({});
const args: Props = {
  rowsCount: 10,
  columnsCount: 24,
  elements: [
    {
      id: 'item1',
      type: 'text',
      value: '<span>item1<span/>',
      x: 4,
      y: 5,
      xSpan: 3,
      ySpan: 1,
    },
    {
      id: 'item2',
      type: 'text',
      value: '<span>item2<span/>',
      x: 0,
      y: 0,
      xSpan: 3,
      ySpan: 3,
    },
  ],
};

Default.args = args;
export default Meta;
