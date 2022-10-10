import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { EditStatus } from '@app/protobuf';
import { IsEnum } from 'class-validator';
import { IsObjectId } from '@valhalla/serv.core';
import { PageProto } from '@app/cqrs/transformers/page.proto';

registerEnumType(EditStatus, { name: 'EditStatus' });

@ObjectType()
export class Page implements PageProto {
  @Field()
  @IsObjectId()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  site: string;

  @Field()
  @IsEnum(EditStatus)
  status: EditStatus;

  @Field({ nullable: true })
  isLoneTitle?: boolean;

  @Field()
  @IsObjectId()
  createdBy: string;

  @Field()
  @IsObjectId()
  updatedBy: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  slug?: string;
}
