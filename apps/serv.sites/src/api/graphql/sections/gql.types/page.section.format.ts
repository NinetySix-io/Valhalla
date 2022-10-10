import { Field, ObjectType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { PageSectionFormatProto } from '@app/cqrs/transformers/page.section.format.proto';

@ObjectType()
export class PageSectionFormat implements PageSectionFormatProto {
  @Field()
  @Min(0)
  rowsCount: number;

  @Field()
  @Min(0)
  rowGap: number;

  @Field()
  @Min(0)
  columnGap: number;
}
