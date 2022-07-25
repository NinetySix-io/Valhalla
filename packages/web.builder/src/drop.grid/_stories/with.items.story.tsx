import * as React from 'react';

import { ComponentMeta } from '@storybook/react';
import { DropGrid } from '../index';
import { DropItem } from '../../drop.item';
import { Typography } from '@mui/material';
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

const TemplateWithItems = ({
  item,
  ...props
}: Props & {
  item: Pick<
    React.ComponentProps<typeof DropItem>,
    'x' | 'y' | 'focusColor' | 'children'
  >;
}) => {
  const [isActive, setIsActive] = React.useState(item.isActive ?? false);

  function handleHover() {
    setIsActive(true);
  }

  function handleHoverExit() {
    setIsActive(false);
  }

  return (
    <DropGrid {...props}>
      <DropItem
        {...item}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverExit}
      >
        <Typography>Test</Typography>
      </DropItem>
    </DropGrid>
  );
};

export const WithItems = TemplateWithItems.bind({});

const args: Props & {
  item: Pick<
    React.ComponentProps<typeof DropItem>,
    'x' | 'y' | 'focusColor' | 'children' | 'label'
  >;
} = {
  rowsCount: 10,
  columnsCount: 10,
  color: theme.palette.grey[600],
  dotWidth: 3,
  style: {
    width: '100%',
  },
  item: {
    label: 'Text',
    focusColor: theme.palette.action.active,
    x: { start: 2, end: 4 },
    y: { start: 4, end: 5 },
  },
};

WithItems.args = args;
export default Meta;
