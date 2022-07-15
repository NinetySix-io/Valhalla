import { ElementType, HTMLType } from '@app/protobuf';
import { createUnionType, registerEnumType } from '@nestjs/graphql';

import { BoxElementSchema } from './boxes/schema';
import { TextElementSchema } from './text/schema';

export * from './model';

registerEnumType(ElementType, {
  name: 'ElementType',
});

registerEnumType(HTMLType, {
  name: 'HTMLType',
});

export const ElementUnion = createUnionType({
  name: 'ElementUnion',
  types: () => [BoxElementSchema, TextElementSchema] as const,
  resolveType(element: BoxElementSchema | TextElementSchema) {
    if (element.type === ElementType.Box) {
      return BoxElementSchema;
    } else if (element.type === ElementType.Text) {
      return TextElementSchema;
    }
  },
});
