import * as React from 'react';

import { EditorStore, makeSection } from '@app/components/page.editor/store';

import type { DecoratorFn } from '@storybook/react';

export const SectionsDecorator = (sectionsCount = 1): DecoratorFn => {
  return (Story) => {
    /**
     * Using memo so that it runs before mount
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useMemo(() => {
      // Clean up all sections
      for (const section of EditorStore.getState().sections) {
        EditorStore.actions.deleteSection(section.id);
      }

      for (let count = 0; count < sectionsCount; count++) {
        const section = makeSection(count);
        EditorStore.actions.addSection(section);
      }
    }, []);

    return <Story />;
  };
};
