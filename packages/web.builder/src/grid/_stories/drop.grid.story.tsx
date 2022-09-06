import * as React from 'react';

import { ScopeProvider, useStore } from '../../context/scope.provider';

import { DndProvider } from 'react-dnd';
import { DropGrid } from '../index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import pick from 'lodash.pick';
import { storiesOf } from '@storybook/react';
import { useDropDimension } from '../../hooks/use.dimension';

type ComponentType = typeof DropGrid;
type Props = React.ComponentProps<ComponentType> & {
  columnsCount: number;
  rowsCount: number;
};

const Content: React.FC<Props> = ({ columnsCount, rowsCount, ...props }) => {
  const zoneId = React.useId();
  const store = useStore();
  const ref = useDropDimension();

  React.useEffect(() => {
    store.actions.props.replace({
      zoneId,
      columnsCount,
      rowsCount,
    });
  }, [columnsCount, rowsCount, zoneId, store]);

  React.useEffect(() => {
    store.actions.isGridVisible.update(true);
  }, [store]);

  return <DropGrid {...props} ref={ref} />;
};

const Template: React.FC<Props> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ScopeProvider>
        <Content {...props} />
      </ScopeProvider>
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
