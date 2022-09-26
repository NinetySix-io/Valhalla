import { faker } from '@faker-js/faker';

export function makeArray(len: number | { max: number; min?: number }) {
  return Array.from({
    length: faker.datatype.number(len),
  });
}
