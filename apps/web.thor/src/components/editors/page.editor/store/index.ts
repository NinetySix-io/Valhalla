import type {
  BoardElement,
  DroppedElement,
} from '@app/components/editors/page.editor/types';
import { createStore, createStoreHook, withImmer } from 'tiamut';

import type { PageSectionSchema } from '@app/generated/valhalla.gql';
import { ScreenSize } from '../constants';
import { compareById } from '@app/lib/compare.by.id';
import { swapArrayIndex } from '@app/lib/array';
import uniqBy from 'lodash.uniqby';

type State = {
  size: ScreenSize;
  cellSize?: number;
  activeSection?: string;
  isDragging: boolean;
  sections: Array<PageSectionSchema & { children: any[] }>;
};

const initialState: State = {
  size: ScreenSize.DESKTOP,
  isDragging: false,
  sections: [],
};

const store = createStore(
  withImmer({
    initialState,
    actions: {
      setIsDragging(state, isDragging: State['isDragging']) {
        state.isDragging = isDragging;
      },
      setActiveSection(state, active: State['activeSection']) {
        state.activeSection = active;
      },
      setSize(state, size: State['size']) {
        state.size = size;
      },
      setCellSize(state, size: State['cellSize']) {
        state.cellSize = size;
      },
      addElement(
        state,
        sectionId: PageSectionSchema['id'],
        element: DroppedElement,
      ) {
        const target = state.sections.find(compareById(sectionId));
        if (target) {
          target.children.push(element);
        }
      },
      replaceElements(
        state,
        sectionId: PageSectionSchema['id'],
        elements: DroppedElement[],
      ) {
        const target = state.sections.find(compareById(sectionId));
        if (target) {
          target.children = uniqBy(
            [...elements, ...target.children],
            (element) => element.id,
          );
        }
      },
      updateElement(
        state,
        sectionId: PageSectionSchema['id'],
        element: DroppedElement,
      ) {
        const section = state.sections.find(compareById(sectionId));
        if (section) {
          section.children = section.children.map((e) =>
            e.id === element.id ? element : e,
          );
        }
      },
      removeElements(
        state,
        sectionId: PageSectionSchema['id'],
        elementIdList: BoardElement['id'][],
      ) {
        const target = state.sections.find(compareById(sectionId));
        if (target) {
          target.children = target.children.filter(
            (element) => !elementIdList.includes(element.id),
          );
        }
      },
      deleteSection(state, sectionId: PageSectionSchema['id']) {
        state.sections = state.sections.filter(compareById(sectionId, false));
      },
      addSection(state, section: PageSectionSchema) {
        state.sections.push({ ...section, children: [] });
      },
      moveSectionUp(state, sectionId: PageSectionSchema['id']) {
        const sectionIndex = state.sections.findIndex(compareById(sectionId));

        if (sectionIndex > 0) {
          swapArrayIndex(state.sections, {
            fromIndex: sectionIndex,
            toIndex: sectionIndex - 1,
          });
        }
      },
      moveSectionDown(state, sectionId: PageSectionSchema['id']) {
        const sectionIndex = state.sections.findIndex(compareById(sectionId));

        if (sectionIndex < state.sections.length - 1) {
          swapArrayIndex(state.sections, {
            fromIndex: sectionIndex,
            toIndex: sectionIndex + 1,
          });
        }
      },
      updateSectionConfig(
        state,
        sectionId: PageSectionSchema['id'],
        nextConfig: PageSectionSchema['format'],
      ) {
        const section = state.sections.find(compareById(sectionId));
        if (section) {
          //TODO
          section.format = nextConfig;
        }
      },
    },
  }),
);

export const EditorStore = {
  ...createStoreHook(store),
  setState: store.setState,
};
