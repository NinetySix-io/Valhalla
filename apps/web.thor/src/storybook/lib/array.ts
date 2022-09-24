import { faker } from '@faker-js/faker';

export function makeArray(max: number, min?: number) {
  return Array.from({
    length: faker.datatype.number({
      max,
      min,
    }),
  });
}
