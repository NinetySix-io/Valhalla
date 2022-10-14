import { ElementText } from './element.text';
import { createUnionType } from '@nestjs/graphql';

export const ElementUnion = createUnionType({
  name: 'ElementUnion',
  types: () => [ElementText] as const,
  resolveType: (value: ElementText) => {
    if (value instanceof ElementText) {
      return ElementText;
    }

    return null;
  },
});
