import * as React from 'react';

import { css, styled } from '@mui/material';

import { getGridArea } from '../lib/get.grid.area';
import { getMaxBBox } from '../lib/get.max.bbox';
import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { selectSelectedElements } from './selectors';
import { useClampElement } from '../hooks/use.element.clamp';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps(['gridArea']),
)<{
  gridArea: string;
}>(
  ({ theme, gridArea }) => css`
    transition: all 0.2s;
    border: solid 3px transparent;
    margin-left: calc(var(--pt-w) * 0.5);
    margin-right: calc(var(--pt-w) / -1);
    margin-bottom: calc(var(--pt-w) * -2);

    ${gridArea
      ? css`
          z-index: -1;
          grid-area: ${gridArea};
          border-color: ${theme.palette.primary.main};
        `
      : css`
          display: none;
        `}
  `,
);

export const SelectionFollower: React.FC = () => {
  const store = useSectionStore();
  const [gridArea, setGridArea] = React.useState<string>();
  const isVisible = store.useSelect((state) => !isNil(state.dragging));
  const selectionDelta = store.useSelect((state) => state.selectionDelta);
  const clampElement = useClampElement();

  /**
   * Setting the grid area of the selection sidekick.
   */
  React.useEffect(() => {
    if (!selectionDelta) {
      setGridArea(null);
      return;
    }

    setGridArea(
      getGridArea(
        clampElement(
          getMaxBBox(selectSelectedElements(store.getState())),
          selectionDelta,
        ),
      ),
    );
  }, [clampElement, selectionDelta, store]);

  if (!gridArea || !isVisible) {
    return null;
  }

  return <Container gridArea={gridArea} />;
};
