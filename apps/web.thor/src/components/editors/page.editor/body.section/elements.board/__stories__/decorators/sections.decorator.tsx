import * as React from 'react';

import {
  EditorStore,
  makeSection,
} from '@app/components/editors/page.editor/store';

import type { DecoratorFn } from '@storybook/react';
import { ElementType } from '@app/generated/valhalla.gql';
import StarterKit from '@tiptap/starter-kit';
import { faker } from '@faker-js/faker';
import { generateHTML } from '@tiptap/react';
import { makeArray } from '@app/storybook/lib/array';
import { makeTextJson } from '@app/storybook/tools/editor/make.text.json';

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
        const section = makeSection(count);
        EditorStore.actions.addSection(section);

        makeArray(elementsCount).forEach((_, idx) => {
          const id = section.id + 'e' + idx;
          const json = makeTextJson();
          EditorStore.actions.addElement(section.id, {
            id,
            type: ElementType.TEXT,
            x: faker.datatype.number({ min: 1, max: 10 }),
            y: faker.datatype.number({ min: 1, max: 10 }),
            xSpan: faker.datatype.number({ min: 1, max: 5 }),
            ySpan: faker.datatype.number({ min: 1, max: 5 }),
            props: {
              json,
              html: generateHTML(json, [StarterKit]),
            },
          });
        });
      }
    }, []);

    return <Story />;
  };
};
