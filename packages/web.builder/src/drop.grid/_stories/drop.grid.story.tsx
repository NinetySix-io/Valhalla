import * as React from 'react';

import {
  ZoneContext,
  gridVisibleAtom,
  useScopeAtomMutate,
} from '../../context';

import { ComponentMeta } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { DropGrid } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { uniqueId } from '@valhalla/utilities';
import { useDropDimension } from '../../hooks/use.dimension';

type ComponentType = typeof DropGrid;
type Props = React.ComponentProps<ComponentType> & {
  showGrid: boolean;
  columnsCount: number;
  rowsCount: number;
};

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/DropGrid',
  component: DropGrid,
};

const Content: React.FC<Props> = ({ showGrid, ...props }) => {
  const ref = useDropDimension();
  const setGridVisible = useScopeAtomMutate(gridVisibleAtom);

  React.useEffect(() => {
    setGridVisible(showGrid);
  }, [showGrid, setGridVisible]);

  return <DropGrid {...props} ref={ref} />;
};

const Template: React.FC<Props> = (props) => {
  const zoneId = React.useRef(uniqueId()).current;
  return (
    <DndProvider backend={HTML5Backend}>
      <ZoneContext.Provider
        value={{
          id: zoneId,
          columnsCount: props.columnsCount,
          rowsCount: props.rowsCount,
        }}
      >
        <Content {...props} />
      </ZoneContext.Provider>
    </DndProvider>
  );
};

export const Default = Template.bind({});
const args: Props = {
  showGrid: true,
  columnsCount: 24,
  rowsCount: 10,
  dotWidth: 3,
};

Default.args = args;

export default Meta;
