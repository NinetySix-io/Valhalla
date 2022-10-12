import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { EditStatus } from '@app/protobuf';
import { IsEnum } from 'class-validator';
import { IsObjectId } from '@valhalla/serv.core';
import { ObjectIDResolver } from 'graphql-scalars';
import { PageProto } from '@app/cqrs/protos/page.proto';

registerEnumType(EditStatus, { name: 'EditStatus' });

@ObjectType()
export class Page implements PageProto {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ObjectIDResolver)
  site: string;

  @Field()
  @IsEnum(EditStatus)
  status: EditStatus;

  @Field({ nullable: true })
  isLoneTitle?: boolean;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  createdBy: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  updatedBy: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  slug?: string;
}
