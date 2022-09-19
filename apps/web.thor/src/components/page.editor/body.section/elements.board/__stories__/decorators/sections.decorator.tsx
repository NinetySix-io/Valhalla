import * as React from 'react';

import { EditorStore, makeSection } from '@app/components/page.editor/store';

import type { DecoratorFn } from '@storybook/react';
import uniqueId from 'lodash.uniqueid';

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
        const section = makeSection();
        EditorStore.actions.addSection(section);

        EditorStore.actions.addElement(section.id, {
          id: uniqueId(),
          type: 'Text',
          x: 4,
          y: 5,
          xSpan: 3,
          ySpan: 1,
        });

        EditorStore.actions.addElement(section.id, {
          id: uniqueId(),
          type: 'Text',
          x: 0,
          y: 0,
          xSpan: 3,
          ySpan: 3,
        });
      }
    }, []);

    return <Story />;
  };
};
