import * as React from 'react';

import { ZoneContext, gridVisibleAtom, useScopeAtom } from '../../context';
import { pick, uniqueId } from '@valhalla/utilities';

import { DndProvider } from 'react-dnd';
import { DropGrid } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { storiesOf } from '@storybook/react';
import { useDropDimension } from '../../hooks/use.dimension';

type ComponentType = typeof DropGrid;
type Props = React.ComponentProps<ComponentType> & {
  columnsCount: number;
  rowsCount: number;
};

const Content: React.FC<Props> = (props) => {
  const ref = useDropDimension();
  const [, showGrid] = useScopeAtom(gridVisibleAtom);

  React.useEffect(() => {
    showGrid(true);
  }, [showGrid]);

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

storiesOf('Components/DropGrid', module)
  .add('Desktop', () => <Template columnsCount={24} rowsCount={10} />)
  .add('Tablet', () => <Template columnsCount={14} rowsCount={10} />, {
    viewport: {
      defaultViewport: 'ipad',
      viewports: pick(INITIAL_VIEWPORTS, ['ipad', 'ipad10p', 'ipad12p']),
    },
  })
  .add('Mobile', () => <Template columnsCount={8} rowsCount={10} />, {
    viewport: {
      defaultViewport: 'iphonex',
      viewports: pick(INITIAL_VIEWPORTS, [
        'iphonex',
        'iphonexr',
        'iphonexsmax',
      ]),
    },
  });
