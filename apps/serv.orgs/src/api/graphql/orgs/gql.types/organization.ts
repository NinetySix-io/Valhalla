import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrgPlan, OrgStatus } from '@app/protobuf';

import { IsObjectId } from '@valhalla/serv.core';
import { OrgProto } from '@app/cqrs/protos/org.proto';

registerEnumType(OrgStatus, { name: 'OrganizationStatus' });
registerEnumType(OrgPlan, { name: 'OrganizationPlan' });

@ObjectType()
export class Organization implements OrgProto {
  @Field()
  @IsObjectId()
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  @IsObjectId()
  createdBy: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field()
  @IsObjectId()
  updateBy: string;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field()
  status: OrgStatus;

  @Field()
  plan: OrgPlan;
}
