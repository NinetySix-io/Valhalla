import * as React from 'react';

import type { Section } from '../store/types';
import { createSectionStore } from './store';

type Props = React.PropsWithChildren<{
  sectionId: Section['id'];
  config: Section['config'];
}>;

const Context = React.createContext({
  store: undefined as ReturnType<typeof createSectionStore>,
});

export function useSectionStore() {
  return React.useContext(Context).store;
}

export function useSectionId() {
  return useSectionStore().useSelect((state) => state.sectionId);
}

export const SectionProvider: React.FC<Props> = ({
  sectionId,
  children,
  config,
}) => {
  const store = React.useMemo(() => createSectionStore(sectionId), [sectionId]);
  React.useMemo(() => store.actions.setConfig(config), [config, store]);

  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
};
