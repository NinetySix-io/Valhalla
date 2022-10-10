import { ElementText } from './element.text';
import { PrimitiveElementType } from '@app/protobuf';
import { createUnionType } from '@nestjs/graphql';

export const ElementUnion = createUnionType({
  name: 'ElementUnion',
  types: () => [ElementText] as const,
  resolveType: (value: ElementText) => {
    if (value.type === PrimitiveElementType.TEXT) {
      return ElementText;
    }

    return null;
  },
});
