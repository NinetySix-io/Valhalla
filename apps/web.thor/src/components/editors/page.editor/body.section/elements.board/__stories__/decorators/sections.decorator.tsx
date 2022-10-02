import * as React from 'react';

import {
  EditorStore,
  makeSection,
} from '@app/components/editors/page.editor/store';

import type { DecoratorFn } from '@storybook/react';
import { ElementType } from '@app/generated/valhalla.gql';
import { faker } from '@faker-js/faker';
import { makeArray } from '@app/storybook/lib/array';

export const SectionsDecorator = (
  sectionsCount = 1,
  elementsCount = 2,
): DecoratorFn => {
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

        makeArray(elementsCount).forEach((_, idx) => {
          const id = section.id + 'e' + idx;
          EditorStore.actions.addElement(section.id, {
            id,
            type: ElementType.TEXT,
            x: faker.datatype.number({ min: 1, max: 10 }),
            y: faker.datatype.number({ min: 1, max: 10 }),
            xSpan: faker.datatype.number({ min: 1, max: 5 }),
            ySpan: faker.datatype.number({ min: 1, max: 5 }),
            props: {},
          });
        });
      }
    }, []);

    return <Story />;
  };
};
