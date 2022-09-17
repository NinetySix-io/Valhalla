import { compareById } from '../compare.by.id';
import { faker } from '@faker-js/faker';

describe('lib::compareById', () => {
  function makeObj<T>(value: T) {
    return {
      id: value,
    };
  }

  it('get correct result', () => {
    const dataTypes = [
      faker.datatype.number(),
      faker.datatype.string(),
      faker.datatype.datetime(),
    ];

    for (const type of dataTypes) {
      const target = makeObj(type);
      const compare = compareById(type);
      expect(compare(target)).toStrictEqual(true);
    }
  });

  it('filters correct result with same id', () => {
    const generators = [faker.datatype.number, faker.datatype.string];
    for (const getValue of generators) {
      const source = faker.helpers.uniqueArray(() => makeObj(getValue()), 10);
      const target = faker.helpers.arrayElement(source);
      const compare = compareById(target.id);
      const result = source.filter(compare);
      for (const item of result) {
        expect(item.id).toStrictEqual(target.id);
      }
    }
  });

  it('filters correct result with not same id', () => {
    const generators = [faker.datatype.number, faker.datatype.string];
    for (const getValue of generators) {
      const source = faker.helpers.uniqueArray(() => makeObj(getValue()), 10);
      const target = faker.helpers.arrayElement(source);
      const compare = compareById(target.id, false);
      const result = source.filter(compare);
      for (const item of result) {
        expect(item.id).not.toStrictEqual(target.id);
      }
    }
  });
});
