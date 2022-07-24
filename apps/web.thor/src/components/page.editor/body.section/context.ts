import * as React from 'react';

import { useReduxSelector } from '@app/redux/hooks';

export const SectionIdContext = React.createContext<string>('');

export function useSectionId() {
  return React.useContext(SectionIdContext);
}

export function useIsSectionActive() {
  const sectionId = useSectionId();
  const activeSection = useReduxSelector(
    (state) => state.SiteEditor.activeSection,
  );

  return sectionId === activeSection;
}

export function useIsDragging() {
  return useReduxSelector((state) => state.SiteEditor.isDragging);
}
