import * as React from 'react';

import { css, styled } from '@mui/material';

import type { SectionState } from '../../store';
import { getMaxBBox } from '../lib/get.max.bbox';
import { isInRange } from '@app/lib/is.in.range';
import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { selectSelectedElements } from '../drag.processors/selectors';
import { useClampElement } from '../hooks/use.element.clamp';
import { useSectionStore } from '../../scope.provider';

const Line = styled(
  'div',
  makeFilterProps(['isVisible', 'shouldLightUp']),
)<{ isVisible: boolean; shouldLightUp: boolean }>(
  ({ theme, isVisible, shouldLightUp }) => css`
    opacity: ${isVisible ? 0.4 : 0};
    position: absolute;
    z-index: -1;
    border: dashed 1px ${theme.palette.primary.main};
    left: calc(50% + (var(--pt-w) / 3));
    height: 100%;
    top: 0px;
    bottom: 0px;

    ${shouldLightUp &&
    css`
      border-color: ${theme.palette.info.main};
      border-style: solid;
      opacity: 1;
      z-index: 1;
    `}
  `,
);

function selectIsCentered(clampFn: ReturnType<typeof useClampElement>) {
  return (state: SectionState) => {
    if (!state.selectionDelta) {
      return false;
    }

    const boardCenter = Math.floor(state.config.columnsCount / 2);
    const bbox = getMaxBBox(selectSelectedElements(state));
    const clampedBox = clampFn(bbox, state.selectionDelta);
    const boxCenterPos = clampedBox.x + clampedBox.xSpan / 2;
    return isInRange(boardCenter, [
      Math.floor(boxCenterPos),
      Math.ceil(boxCenterPos),
    ]);
  };
}

export const CenterLine: React.FC = () => {
  const store = useSectionStore();
  const clampElement = useClampElement();
  const isVisible = store.useSelect((state) => !isNil(state.dragging));
  const isCentered = store.useSelect(selectIsCentered(clampElement));

  return <Line isVisible={isVisible} shouldLightUp={isCentered} />;
};
