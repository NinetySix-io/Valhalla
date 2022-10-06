import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';
import { PrimitiveElementType } from '@app/protobuf';
import { createUnionType } from '@nestjs/graphql';

export const ElementUnion = createUnionType({
  name: 'ElementUnion',
  types: () => [PageElementTextSchema] as const,
  resolveType(value: PageElementTextSchema) {
    if (value.type === PrimitiveElementType.TEXT) {
      return PageElementTextSchema;
    }

    return null;
  },
});
