import type {
  BoardElement,
  DroppedElement,
} from '@app/components/page.editor/types';
import { createStore, createStoreHook, withImmer } from 'tiamut';

import { ScreenSize } from '../constants';
import type { Section } from './types';
import { compareById } from '@app/lib/compare.by.id';
import { swapArrayIndex } from '@app/lib/array';
import uniqBy from 'lodash.uniqby';

//TODO: server side
export function makeSection(index: number): Section {
  return {
    id: String(index),
    children: [],
    config: {
      // TODO: should be server side
      columnsCount: 24,
      rowsCount: 10,
    },
  };
}

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
      setActiveElement(state, element: State['activeElement']) {
        state.activeElement = element;
      },
      setSize(state, size: State['size']) {
        state.size = size;
      },
      setCellSize(state, size: State['cellSize']) {
        state.cellSize = size;
      },
      addElement(state, sectionId: Section['id'], element: DroppedElement) {
        const target = state.sections.find(compareById(sectionId));
        if (target) {
          target.children.push(element);
        }
      },
      replaceElements(
        state,
        sectionId: Section['id'],
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
      removeElements(
        state,
        sectionId: Section['id'],
        elementIdList: BoardElement['id'][],
      ) {
        const target = state.sections.find(compareById(sectionId));
        if (target) {
          target.children = target.children.filter(
            (element) => !elementIdList.includes(element.id),
          );
        }
      },
      deleteSection(state, sectionId: Section['id']) {
        state.sections = state.sections.filter(compareById(sectionId, false));
      },
      addSection(
        state,
        section: Section,
        options?: {
          anchorSection: Section['id'];
          isBefore: boolean;
        },
      ) {
        if (!options) {
          state.sections.push(section);
        } else {
          const anchorIndex = state.sections.findIndex(
            compareById(options.anchorSection),
          );

          const positionIndex = options.isBefore
            ? anchorIndex
            : anchorIndex + 1;

          state.sections.splice(positionIndex, 0, section);
        }
      },
      moveSectionUp(state, sectionId: Section['id']) {
        const sectionIndex = state.sections.findIndex(compareById(sectionId));

        if (sectionIndex > 0) {
          swapArrayIndex(state.sections, {
            fromIndex: sectionIndex,
            toIndex: sectionIndex - 1,
          });
        }
      },
      moveSectionDown(state, sectionId: Section['id']) {
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
        sectionId: Section['id'],
        nextConfig: Section['config'],
      ) {
        const section = state.sections.find(compareById(sectionId));
        if (section) {
          section.config = nextConfig;
        }
      },
    },
  }),
);

export const EditorStore = {
  ...createStoreHook(store),
  setState: store.setState,
};