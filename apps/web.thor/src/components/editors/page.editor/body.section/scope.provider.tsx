import * as React from 'react';

import type { Section } from '../store/types';
import { createSectionStore } from './store';

type Props = React.PropsWithChildren<{
  sectionId: Section['id'];
  config: Section['config'];
  index: number;
}>;

const Context = React.createContext({
  index: undefined as number,
  store: undefined as ReturnType<typeof createSectionStore>,
});

export function useSectionStore() {
  return React.useContext(Context).store;
}

export function useSectionId() {
  return useSectionStore().useSelect((state) => state.sectionId);
}

export function useSectionIndex() {
  return React.useContext(Context).index;
}

export const SectionProvider: React.FC<Props> = ({
  sectionId,
  children,
  index,
  config,
}) => {
  const store = React.useMemo(
    () => createSectionStore(sectionId, { config }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionId],
  );

  React.useEffect(() => {
    store.actions.setConfig(config);
  }, [config, store]);

  return (
    <Context.Provider value={{ store, index }}>{children}</Context.Provider>
  );
};
