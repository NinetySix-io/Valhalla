import * as React from 'react';

import { useReduxSelector } from '@app/redux/hooks';

export const SectionIdContext = React.createContext<string>('');
export const DropIdContext = React.createContext<string>('');

export function useSectionId() {
  return React.useContext(SectionIdContext);
}

export function useActiveSectionId() {
  return useReduxSelector((state) => state.SiteEditor.activeSection);
}

export function useActiveElement() {
  return useReduxSelector((state) => state.SiteEditor.activeElement);
}

export function useActiveSection() {
  return useReduxSelector((state) =>
    !state.SiteEditor.activeSection
      ? undefined
      : state.SiteEditor.sections.find(
          (section) => section.id === state.SiteEditor.activeSection,
        ),
  );
}

export function useIsSectionActive() {
  const sectionId = useSectionId();
  const activeSection = useActiveSectionId();
  return sectionId === activeSection;
}

export function useIsDragging() {
  return useReduxSelector((state) => state.SiteEditor.isDragging);
}
