import type {
  BuilderElement,
  BuilderElementWithId,
} from '@app/components/page.editor/types';
import { swapArrayIndex } from '@app/lib/array';
import { createStore, createStoreHook, withImmer } from 'tiamut';

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

export const SiteEditor = createStore(
  withImmer({
    initialState: {
      size: ScreenSize.DESKTOP,
      isDragging: false,
      sections: [],
    } as State,
    actions: {
      setIsDragging(state, isDragging: State['isDragging']) {
        state.isDragging = isDragging;
      },
      setActiveSection(state, active: State['activeSection']) {
        state.activeSection = active;
      },
      setActiveElement(state, element: State['activeElement']) {
        state.activeElement = element;
      },
      setSize(state, size: State['size']) {
        state.size = size;
      },
      setCellSize(state, size: State['cellSize']) {
        state.cellSize = size;
      },
      updateElementPosition(
        state,
        {
          sectionId,
        }: {
          elementId: string;
          sectionId: string;
        },
      ) {
        const target = state.sections.find(
          (section) => section.id === sectionId,
        );

        if (target) {
          // target.children = target.children;
        }

        return state;
      },
      addElement(
        state,
        action: {
          sectionId: string;
          element: BuilderElement;
        },
      ) {
        const { element, sectionId } = action;
        const target = state.sections.find(
          (section) => section.id === sectionId,
        );
        if (target) {
          target.children.push({
            id: new Date().valueOf().toString(),
            ...element,
          });
        }
      },
      removeElement(
        state,
        {
          elementId,
          sectionId,
        }: {
          elementId: string;
          sectionId: string;
        },
      ) {
        const target = state.sections.find(
          (section) => section.id === sectionId,
        );

        if (target) {
          target.children = target.children.filter(
            (element) => element.id !== elementId,
          );
        }
      },
      deleteSection(state, sectionId: string) {
        state.sections = state.sections.filter(
          (section) => section.id !== sectionId,
        );
      },
      addSection(
        state,
        options?: {
          anchorSection: string;
          isBefore: boolean;
        },
      ) {
        const newSection: Section = {
          id: new Date().valueOf().toString(),
          children: [],
          config: {
            rowsCount: 10,
          },
        };

        if (!options) {
          state.sections.push(newSection);
        } else {
          const anchorIndex = state.sections.findIndex(
            (section) => section.id === options.anchorSection,
          );

          const positionIndex = options.isBefore
            ? anchorIndex
            : anchorIndex + 1;

          state.sections.splice(positionIndex, 0, newSection);
        }
      },
      moveSectionUp(state, sectionId: string) {
        const sectionIndex = state.sections.findIndex(
          (section) => section.id === sectionId,
        );

        if (sectionIndex > 0) {
          swapArrayIndex(state.sections, {
            fromIndex: sectionIndex,
            toIndex: sectionIndex - 1,
          });
        }
      },
      moveSectionDown(state, sectionId: string) {
        const sectionIndex = state.sections.findIndex(
          (section) => section.id === sectionId,
        );

        if (sectionIndex < state.sections.length - 1) {
          swapArrayIndex(state.sections, {
            fromIndex: sectionIndex,
            toIndex: sectionIndex + 1,
          });
        }
      },
    },
  }),
);

export const EditorStore = createStoreHook(SiteEditor);
