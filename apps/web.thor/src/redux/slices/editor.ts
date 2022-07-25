import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { XYCoord } from 'react-dnd';
import { swapArrayIndex } from '@app/lib/array';

export enum ScreenSize {
  DESKTOP = 1200,
  MOBILE = 400,
  TABLET = 820,
}

export type SectionDrop = {
  id: string;
  type: string;
  position?: {
    xAxis: number;
    yAxis: number;
  };
};

export type Section = {
  id: string;
  children: Array<SectionDrop>;
};

type State = {
  size: ScreenSize;
  activeSection?: string;
  activeDrop?: string;
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
    setActiveDrop(state, action: PayloadAction<State['activeDrop']>) {
      state.activeDrop = action.payload;
    },
    setSize(state, action: PayloadAction<State['size']>) {
      state.size = action.payload;
    },
    updateDropPosition(
      state,
      action: PayloadAction<{
        dropId: string;
        sectionId: string;
        delta: XYCoord;
      }>,
    ) {
      const target = state.sections.find(
        (section) => section.id === action.payload.sectionId,
      );

      if (target) {
        // target.children = target.children;
      }

      return state;
    },
    addDrop(
      state,
      action: PayloadAction<{
        type: string;
        sectionId: string;
        delta: XYCoord;
      }>,
    ) {
      const target = state.sections.find(
        (section) => section.id === action.payload.sectionId,
      );

      if (target) {
        target.children.push({
          id: new Date().valueOf().toString(),
          type: action.payload.type,
        });
      }
    },
    removeDrop(
      state,
      action: PayloadAction<{ dropId: string; sectionId: string }>,
    ) {
      const target = state.sections.find(
        (section) => section.id === action.payload.sectionId,
      );

      if (target) {
        target.children = target.children.filter(
          (drop) => drop.id !== action.payload.dropId,
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
