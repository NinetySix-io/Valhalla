import * as React from 'react';

import { EditorStore, makeSection } from '@app/components/page.editor/store';

import type { DecoratorFn } from '@storybook/react';
import { faker } from '@faker-js/faker';

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
        Array.from({
          length: faker.datatype.number({
            min: 2,
            max: 10,
          }),
        }).forEach((_, idx) => {
          const id = section.id + 'e' + idx;
          EditorStore.actions.addElement(section.id, {
            id,
            type: 'Text',
            x: faker.datatype.number({ min: 0, max: 10 }),
            y: faker.datatype.number({ min: 0, max: 10 }),
            xSpan: faker.datatype.number({ min: 1, max: 5 }),
            ySpan: faker.datatype.number({ min: 1, max: 5 }),
            props: {
              value: `<span>${id}</span>`,
            },
          });
        });
      }
    }, []);

    return <Story />;
  };
};
