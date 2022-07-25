import * as React from 'react';

import { useReduxSelector } from '@app/redux/hooks';

export const SectionIdContext = React.createContext<string>('');
export const DropIdContext = React.createContext<string>('');

export function useSectionId() {
  return React.useContext(SectionIdContext);
}

export function useActiveSection() {
  return useReduxSelector((state) => state.SiteEditor.activeSection);
}

export function useActiveDrop() {
  return useReduxSelector((state) => state.SiteEditor.activeDrop);
}

export function useIsSectionActive() {
  const sectionId = useSectionId();
  const activeSection = useActiveSection();
  return sectionId === activeSection;
}

export function useIsDragging() {
  return useReduxSelector((state) => state.SiteEditor.isDragging);
}
