import type { PageElement, XYCoord } from '../../types';
import { createStore, createStoreHook, withImmer } from 'tiamut';

import type { PageSection } from '@app/generated/valhalla.gql';
import type { Rectangle } from './../elements.board/lib/rectangle';
import { createSectionEmitter } from '../emitter';

type State = {
  minSelectionSize: number;
  sectionId: string;
  isEditingText: boolean;
  config: PageSection['format'];
  cellSize: number;
  container: HTMLElement;
  dragging?: PageElement;
  selectionBox?: Rectangle;
  resizing?: PageElement['id'];
  focused?: PageElement['id'];
  selections: PageElement['id'][];
  dragDelta?: XYCoord;
  isHoldingDownShiftKey: boolean;
  emitter: ReturnType<typeof createSectionEmitter>;
  elements: Record<PageElement['id'], PageElement & { ref: HTMLElement }>;
};

export type SectionState = State;

const initialState = {
  minSelectionSize: 2,
  cellSize: 0,
  elements: {},
  selections: [],
  isEditingText: false,
  isHoldingDownShiftKey: false,
} as State;

export function createSectionStore(
  sectionId: string,
  optionalState: Partial<Omit<State, 'sectionId' | 'emitter'>> = {},
) {
  const store = createStore(
    withImmer({
      initialState: {
        ...initialState,
        ...optionalState,
        emitter: createSectionEmitter(),
        sectionId,
      },
      actions: {
        setIsEditingText(state, value: State['isEditingText']) {
          state.isEditingText = value;
        },
        setCellSize(state, value: State['cellSize']) {
          state.cellSize = value;
        },
        setContainer(state, value: State['container']) {
          state.container = value;
        },
        setDragging(state, value?: State['dragging']) {
          state.dragging = value;
        },
        addElement(state, element: PageElement, ref: HTMLElement) {
          state.elements[element.id] = {
            ...element,
            ref,
          };
        },
        removeElement(state, elementId: PageElement['id']) {
          delete state.elements[elementId];
        },
        setFocus(state, element: State['focused']) {
          state.focused = element;
        },
        removeFocus(state) {
          state.focused = null;
        },
        setSelectionBox(state, rectangle: State['selectionBox']) {
          state.selectionBox = rectangle;
        },
        overwriteSelections(state, selections: State['selections']) {
          state.selections = selections;
        },
        setDragDelta(state, delta: State['dragDelta']) {
          state.dragDelta = delta;
        },
        setResizing(state, elementId: State['resizing']) {
          state.resizing = elementId;
        },
        setSelection(
          state,
          elementId: PageElement['id'],
          standalone?: boolean,
        ) {
          if (standalone) {
            state.selections = [elementId];
          } else {
            state.selections.push(elementId);
          }
        },
        removeSelection(state, elementId: PageElement['id']) {
          state.selections = state.selections.filter(
            (selectionId) => selectionId !== elementId,
          );
        },
        clearSelections(state) {
          state.selections = [];
        },
        setHoldingDownShiftKey(state, value: boolean) {
          state.isHoldingDownShiftKey = value;
        },
        setConfig(state, config: State['config']) {
          state.config = config;
        },
      },
    }),
  );

  return createStoreHook(store);
}
