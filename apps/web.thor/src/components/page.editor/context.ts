import * as React from 'react';

import { EditorStore } from './store';

export const DropIdContext = React.createContext<string>('');

export function useActiveSectionId() {
  return EditorStore.useSelect((state) => state.activeSection);
}

export function useActiveElement() {
  return EditorStore.useSelect((state) => state.activeElement);
}

export function useActiveSection() {
  return EditorStore.useSelect((state) =>
    !state.activeSection
      ? undefined
      : state.sections.find((section) => section.id === state.activeSection),
  );
}

export function useIsDragging() {
  return EditorStore.useSelect((state) => state.isDragging);
}
