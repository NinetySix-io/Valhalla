import {
  BuilderElement,
  BuilderElementWithId,
} from '@app/components/page.editor/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { swapArrayIndex } from '@app/lib/array';

export enum ScreenSize {
  DESKTOP = 1200,
  MOBILE = 400,
  TABLET = 820,
}

export type Section = {
  id: string;
  children: Array<BuilderElementWithId>;
  config: {
    rowsCount: number;
  };
};

type State = {
  size: ScreenSize;
  cellSize?: number;
  activeSection?: string;
  activeElement?: string;
  isDragging: boolean;
  sections: Section[];
};

const initialState: State = {
  size: ScreenSize.DESKTOP,
  isDragging: false,
  sections: [],
};

export const SiteEditorSlice = createSlice({
  name: 'SiteEditor',
  initialState,
  reducers: {
    setIsDragging(state, action: PayloadAction<State['isDragging']>) {
      state.isDragging = action.payload;
    },
    setActiveSection(state, action: PayloadAction<State['activeSection']>) {
      state.activeSection = action.payload;
    },
    setActiveElement(state, action: PayloadAction<State['activeElement']>) {
      state.activeElement = action.payload;
    },
    setSize(state, action: PayloadAction<State['size']>) {
      state.size = action.payload;
    },
    setCellSize(state, action: PayloadAction<State['cellSize']>) {
      state.cellSize = action.payload;
    },
    updateElementPosition(
      state,
      action: PayloadAction<{
        elementId: string;
        sectionId: string;
      }>,
    ) {
      const { sectionId } = action.payload;
      const target = state.sections.find((section) => section.id === sectionId);

      if (target) {
        // target.children = target.children;
      }

      return state;
    },
    addElement(
      state,
      action: PayloadAction<{
        sectionId: string;
        element: BuilderElement;
      }>,
    ) {
      const { element, sectionId } = action.payload;
      const target = state.sections.find((section) => section.id === sectionId);
      if (target) {
        target.children.push({
          id: new Date().valueOf().toString(),
          ...element,
        });
      }
    },
    removeElement(
      state,
      action: PayloadAction<{ elementId: string; sectionId: string }>,
    ) {
      const target = state.sections.find(
        (section) => section.id === action.payload.sectionId,
      );

      if (target) {
        target.children = target.children.filter(
          (element) => element.id !== action.payload.elementId,
        );
      }
    },
    deleteSection(state, action: PayloadAction<string>) {
      const target = action.payload;
      state.sections = state.sections.filter(
        (section) => section.id !== target,
      );
    },
    addSection(
      state,
      action: PayloadAction<
        | undefined
        | {
            anchorSection: string;
            isBefore: boolean;
          }
      >,
    ) {
      const newSection: Section = {
        id: new Date().valueOf().toString(),
        children: [],
        config: {
          rowsCount: 10,
        },
      };

      if (!action.payload) {
        state.sections.push(newSection);
      } else {
        const anchorIndex = state.sections.findIndex(
          (section) => section.id === action.payload.anchorSection,
        );

        const positionIndex = action.payload.isBefore
          ? anchorIndex
          : anchorIndex + 1;

        state.sections.splice(positionIndex, 0, newSection);
      }
    },
    moveSectionUp(state, action: PayloadAction<string>) {
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === action.payload,
      );

      if (sectionIndex > 0) {
        swapArrayIndex(state.sections, {
          fromIndex: sectionIndex,
          toIndex: sectionIndex - 1,
        });
      }
    },
    moveSectionDown(state, action: PayloadAction<string>) {
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === action.payload,
      );

      if (sectionIndex < state.sections.length - 1) {
        swapArrayIndex(state.sections, {
          fromIndex: sectionIndex,
          toIndex: sectionIndex + 1,
        });
      }
    },
  },
});
