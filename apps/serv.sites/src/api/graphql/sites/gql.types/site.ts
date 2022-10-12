import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ObjectIDResolver, URLResolver } from 'graphql-scalars';

import { SiteProto } from '@app/cqrs/transformers/site.proto';
import { SiteStatus } from '@app/protobuf';

registerEnumType(SiteStatus, { name: 'SiteStatus' });

@ObjectType()
export class Site implements SiteProto {
  @Field(() => ObjectIDResolver)
  id: string;

  @Field()
  name: string;

  @Field(() => ObjectIDResolver)
  createdBy: string;

  @Field(() => ObjectIDResolver)
  updatedBy: string;

  @Field(() => SiteStatus)
  status: SiteStatus;

  @Field(() => URLResolver)
  url?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
