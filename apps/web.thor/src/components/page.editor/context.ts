import * as React from 'react';

import { EditorStore } from './store';

export const SectionIdContext = React.createContext<string>('');
export const DropIdContext = React.createContext<string>('');

export function useSectionId() {
  return React.useContext(SectionIdContext);
}

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

export function useIsSectionActive() {
  const sectionId = useSectionId();
  const activeSection = useActiveSectionId();
  return sectionId === activeSection;
}

export function useIsDragging() {
  return EditorStore.useSelect((state) => state.isDragging);
}
