import * as React from 'react';

import type { DecoratorFn } from '@storybook/react';

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
      //TODO: mock gql
      // Clean up all sections
      // for (const section of EditorStore.getState().sections) {
      //   EditorStore.actions.deleteSection(section.id);
      // }
      // for (let count = 0; count < sectionsCount; count++) {
      //   const section = makeSection();
      //   EditorStore.actions.addSection(section);
      //   makeArray(elementsCount).forEach((_, idx) => {
      //     const id = section.id + 'e' + idx;
      //     EditorStore.actions.addElement(section.id, {
      //       id,
      //       type: 'text',
      //       x: faker.datatype.number({ min: 1, max: 10 }),
      //       y: faker.datatype.number({ min: 1, max: 10 }),
      //       width: faker.datatype.number({ min: 1, max: 5 }),
      //       height: faker.datatype.number({ min: 1, max: 5 }),
      //       props: {},
      //     });
      //   });
      // }
    }, []);

    return <Story />;
  };
};
