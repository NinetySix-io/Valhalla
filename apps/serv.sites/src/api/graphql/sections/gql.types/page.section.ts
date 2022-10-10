import { Field, ObjectType } from '@nestjs/graphql';

import { PageSectionFormat } from './page.section.format';
import { PageSectionProto } from '@app/cqrs/transformers/page.section.proto';

@ObjectType()
export class PageSection implements PageSectionProto {
  @Field()
  id: string;

  @Field()
  format?: PageSectionFormat;

  @Field()
  updatedBy: string;

  @Field()
  createdBy: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
