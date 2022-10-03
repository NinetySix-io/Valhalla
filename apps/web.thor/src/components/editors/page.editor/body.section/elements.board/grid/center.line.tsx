import * as React from 'react';

import { css, styled } from '@mui/material';

import type { SectionState } from '../../store';
import { getColumnsCount } from '../../../hooks/use.columns.count';
import { isInRange } from '@app/lib/is.in.range';
import { makeFilterProps } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

const Line = styled(
  'div',
  makeFilterProps(['isVisible', 'shouldLightUp']),
)<{ shouldLightUp: boolean }>(
  ({ theme, shouldLightUp }) => css`
    opacity: 0;
    position: absolute;
    z-index: -1;
    left: calc(50% + (var(--pt-w) / 3));
    height: 100%;
    top: 0px;
    bottom: 0px;

    ${shouldLightUp &&
    css`
      width: 2px;
      background-color: ${theme.palette.info.main};
      opacity: 1;
      z-index: 1;
    `}
  `,
);

function selectIsCentered() {
  return (state: SectionState) => {
    if (!state.dragging) {
      return false;
    }

    const boardCenter = Math.floor(getColumnsCount() / 2);
    const boxCenterPos = state.dragging.x + state.dragging.xSpan / 2;

    return isInRange(boardCenter, [
      Math.floor(boxCenterPos),
      Math.ceil(boxCenterPos),
    ]);
  };
}

export const CenterLine: React.FC = () => {
  const store = useSectionStore();
  const isCentered = store.useSelect(selectIsCentered());

  //TODO: do this later
  return <Line shouldLightUp={isCentered} />;
};
