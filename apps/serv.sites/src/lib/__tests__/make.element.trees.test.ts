import { ElementSchema } from '@app/entities/elements/schema';
import { ElementType } from '@app/protobuf';
import { makeElementTrees } from '../make.element.trees';
import { toObjectId } from '@valhalla/serv.core';

describe('Lib:: makeElementTrees', () => {
  const owner = toObjectId();
  const leafEnd = toObjectId('62cba8b78eb6823f125696a6');
  const leaf1 = toObjectId('62cba8b78eb6823f125696a3');
  const parent1 = toObjectId('62cba8b78eb6823f125696a4');
  const parent2 = toObjectId('62cba8b78eb6823f125696a5');

  function createSeed(
    prop: Pick<ElementSchema, '_id' | 'isRoot' | 'type' | 'parent'>,
  ): ElementSchema {
    return {
      id: prop._id.toHexString(),
      _id: prop._id,
      isRoot: prop.isRoot,
      type: prop.type,
      parent: prop.parent,
      ownBy: owner,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: owner,
    };
  }

  const goodStruct: ElementSchema[] = [
    createSeed({
      _id: parent1,
      isRoot: true,
      type: ElementType.a,
      parent: '',
    }),
    createSeed({
      _id: leaf1,
      isRoot: false,
      type: ElementType.a,
      parent: parent1.toHexString(),
    }),
    createSeed({
      _id: leafEnd,
      isRoot: false,
      type: ElementType.a,
      parent: leaf1.toHexString(),
    }),
    createSeed({
      _id: parent2,
      isRoot: true,
      type: ElementType.a,
      parent: '',
    }),
  ];

  it('make a good tree', () => {
    const tree = makeElementTrees(goodStruct);
    expect(tree).toMatchSnapshot();
  });
});
