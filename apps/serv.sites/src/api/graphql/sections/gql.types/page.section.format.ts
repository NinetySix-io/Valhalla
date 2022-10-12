import { Field, ObjectType } from '@nestjs/graphql';

import { Min } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { PageSectionFormatProto } from '@app/cqrs/protos/page.section.format.proto';

@ObjectType()
export class PageSectionFormat implements PageSectionFormatProto {
  @Field(() => NonNegativeIntResolver)
  @Min(0)
  rowsCount: number;

  @Field(() => NonNegativeIntResolver)
  @Min(0)
  rowGap: number;

  @Field(() => NonNegativeIntResolver)
  @Min(0)
  columnGap: number;
}
