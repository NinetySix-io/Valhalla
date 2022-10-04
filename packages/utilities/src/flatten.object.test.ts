import { flattenObject } from './flatten.object';

describe('flatten.object', () => {
  it('flattens', () => {
    const input = { a: 1, b: 2, c: { d: 1 } };
    const output = { a: 1, b: 2, 'c.d': 1 };
    expect(flattenObject(input)).toStrictEqual(output);
  });

  it('ignore array', () => {
    const input = { a: [1, 2, 3] };
    const output = input;
    expect(flattenObject(input)).toStrictEqual(output);
  });

  it('ignore constructors', () => {
    const input = { a: new Date() };
    const output = input;
    expect(flattenObject(input)).toStrictEqual(output);
  });
});
