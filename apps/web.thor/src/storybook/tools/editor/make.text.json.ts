import { faker } from '@faker-js/faker';
import { makeArray } from '@app/storybook/lib/array';

export function makeParagraphJson() {
  return {
    type: 'doc',
    content: makeArray({ min: 1, max: 3 }).map(() => ({
      type: 'paragraph',
      content: makeArray({ min: 3, max: 10 }).map(() => ({
        type: 'text',
        text: faker.lorem.paragraph(),
      })),
    })),
  };
}

export function makeTextJson() {
  return {
    type: 'doc',
    content: makeArray(1).map(() => ({
      type: 'paragraph',
      content: makeArray(1).map(() => ({
        type: 'text',
        text: faker.lorem.words(
          faker.datatype.number({
            min: 5,
            max: 20,
          }),
        ),
      })),
    })),
  };
}
