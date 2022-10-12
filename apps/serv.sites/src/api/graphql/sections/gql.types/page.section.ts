import { Field, ObjectType } from '@nestjs/graphql';

import { ObjectIDResolver } from 'graphql-scalars';
import { PageSectionFormat } from './page.section.format';
import { PageSectionProto } from '@app/cqrs/transformers/page.section.proto';

@ObjectType()
export class PageSection implements PageSectionProto {
  @Field(() => ObjectIDResolver)
  id: string;

  @Field(() => PageSectionFormat)
  format?: PageSectionFormat;

  @Field(() => ObjectIDResolver)
  updatedBy: string;

  @Field(() => ObjectIDResolver)
  createdBy: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
