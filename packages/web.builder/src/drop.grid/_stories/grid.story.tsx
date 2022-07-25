import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DndProvider } from 'react-dnd';
import { DropGrid } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { theme } from '@valhalla/web.react';

type ComponentType = typeof DropGrid;
type Props = React.ComponentProps<ComponentType>;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/DropGrid',
  component: DropGrid,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
  },
};

const Template: ComponentStory<typeof DropGrid> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DropGrid {...props} />
    </DndProvider>
  );
};

export const Grid = Template.bind({});

const args: Props = {
  rowsCount: 10,
  columnsCount: 10,
  color: theme.palette.grey[600],
  dotWidth: 3,
  style: {
    width: '100%',
  },
};

Grid.args = args;

export default Meta;
