import { BuilderElement } from './types';
import { StoreRootState } from '@app/redux';
import { XYCoord } from 'react-dnd';
import { createSelector } from '@reduxjs/toolkit';
import { getScreenSizeConfig } from './lib/get.size.config';

export function selectSection(sectionId: string) {
  return createSelector(
    (state: StoreRootState) => state.SiteEditor.sections,
    (sections) => sections.find((section) => section.id === sectionId),
  );
}

export function selectSizeConfig() {
  return createSelector(
    (state: StoreRootState) => state.SiteEditor.size,
    (size) => getScreenSizeConfig(size),
  );
}

export function calculateSpan(sectionId: string) {
  return createSelector(
    [
      (state: StoreRootState) => state.SiteEditor.cellSize,
      (state: StoreRootState) =>
        state.SiteEditor.sections.find((section) => section.id === sectionId),
    ],
    (cellSize, section) => {
      return (element: BuilderElement, coordinate: XYCoord) => {
        const rows = section?.config?.rowsCount;
        const eHeightPct = element.height;
        const eWidthPct = element.width;
        const xStart = coordinate.x;
        const yStart = coordinate.y;
        const xEnd = xStart + eWidthPct;
        const yEnd = yStart + eHeightPct;

        return {
          rows,
          xStart,
          xEnd,
          yStart,
          yEnd,
        };
      };
    },
  );
}
