import { faker } from '@faker-js/faker';
import { swapArrayIndex } from '../array';

describe('lib:swapArrayIndex', () => {
  it('swaps correctly', () => {
    const len = 30;
    const source = faker.helpers.uniqueArray(faker.datatype.number, len);
    const [fromIdx, toIdx] = faker.helpers.arrayElements(
      Array.from({ length: len }).map((_, i) => i),
      2,
    );

    expect(fromIdx).not.toStrictEqual(-1);
    expect(toIdx).not.toStrictEqual(-1);
    const fromValue = source[fromIdx];
    const toValue = source[toIdx];

    swapArrayIndex(source, { fromIndex: fromIdx, toIndex: toIdx });
    expect(fromValue).not.toStrictEqual(source[fromIdx]);
    expect(toValue).not.toStrictEqual(source[toIdx]);

    expect(fromValue).toStrictEqual(source[toIdx]);
    expect(toValue).toStrictEqual(source[fromIdx]);
  });
});
