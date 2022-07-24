import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { swapArrayIndex } from '@app/lib/array';

export enum ScreenSize {
  DESKTOP,
  MOBILE,
  TABLET,
}

type Section = {
  id: string;
};

type State = {
  size: ScreenSize;
  activeSection?: string;
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
    setSize(state, action: PayloadAction<State['size']>) {
      state.size = action.payload;
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
