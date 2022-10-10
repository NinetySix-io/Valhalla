import * as React from 'react';

import { css, styled, useTheme } from '@mui/material';
import { useSectionId, useSectionStore } from '../../scope.provider';

import { getGridArea } from '../lib/get.grid.area';
import isNil from 'lodash.isnil';
import { useColumnsCount } from '../../../hooks/use.columns.count';

const StyledCell = styled('div')(
  ({ theme }) => css`
    border: solid thin ${theme.palette.grey[200]};
    background-color: #f2f2f240;
    border-radius: 3px;
    z-index: -1;
  `,
);

const Cells = React.memo(() => {
  const sectionId = useSectionId();
  const store = useSectionStore();
  const columnsCount = useColumnsCount();
  const config = store.useSelect((state) => state.config);
  const output: JSX.Element[] = [];

  for (let x = 0; x < columnsCount; x++) {
    if (x === 0 || x === columnsCount - 1) {
      continue;
    }

    for (let y = 0; y < config.rowsCount; y++) {
      output.push(
        <StyledCell
          key={`cell-${sectionId}-${x}-${y}`}
          style={{
            gridArea: getGridArea({
              x,
              y,
              width: 1,
              height: 1,
            }),
          }}
        />,
      );
    }
  }

  return <React.Fragment>{output}</React.Fragment>;
});

const Shield: React.FC = () => {
  const store = useSectionStore();
  const theme = useTheme();
  const config = store.useSelect((state) => state.config);
  const columnsCount = useColumnsCount();
  const isVisible = store.useSelect(
    (state) => !isNil(state.dragging || state.resizing),
  );

  return (
    <div
      style={{
        zIndex: -1,
        opacity: isVisible ? 0 : 1,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.short,
        }),
        gridArea: getGridArea({
          x: 0,
          y: 0,
          width: columnsCount,
          height: config.rowsCount,
        }),
      }}
    />
  );
};

export const Background: React.FC = () => {
  return (
    <React.Fragment>
      <Cells />
      <Shield />
    </React.Fragment>
  );
};
