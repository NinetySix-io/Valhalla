import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { SiteProto } from '@app/cqrs/transformers/site.proto';
import { SiteStatus } from '@app/protobuf';

registerEnumType(SiteStatus, { name: 'SiteStatus' });

@ObjectType()
export class Site implements SiteProto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdBy: string;

  @Field()
  updatedBy: string;

  @Field()
  status: SiteStatus;

  @Field()
  url?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
