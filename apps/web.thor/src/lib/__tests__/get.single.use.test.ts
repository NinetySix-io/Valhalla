import { faker } from '@faker-js/faker';
import { getSingleUse } from '../get.single.use';

describe('lib::getSingleUse', () => {
  it('get correctly from array', () => {
    const source = Array.from({ length: 10 });
    const value = getSingleUse(source);
    expect(Array.isArray(value)).toStrictEqual(false);
  });

  it('get correctly from non-array', () => {
    const source = faker.datatype.number();
    const value = getSingleUse(source);
    expect(Array.isArray(value)).toStrictEqual(false);
  });
});
