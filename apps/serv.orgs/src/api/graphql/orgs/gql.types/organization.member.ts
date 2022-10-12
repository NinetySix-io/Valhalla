import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InvitationStatus, OrgRole } from '@app/protobuf';
import { ObjectIDResolver, URLResolver } from 'graphql-scalars';

import { IsObjectId } from '@valhalla/serv.core';
import { OrgMemberProto } from '@app/cqrs/protos/org.member.proto';

registerEnumType(InvitationStatus, { name: 'InvitationStatus' });
registerEnumType(OrgRole, { name: 'OrganizationRole' });

@ObjectType()
export class OrganizationMember implements OrgMemberProto {
  @Field(() => ObjectIDResolver)
  @IsObjectId()
  id: string;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  user: string;

  @Field(() => InvitationStatus)
  status: InvitationStatus;

  @Field(() => OrgRole)
  role: OrgRole;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => ObjectIDResolver)
  @IsObjectId()
  updatedBy: string;

  @Field(() => URLResolver, { nullable: true })
  profileImageUrl?: string;

  organization: string;

  invitedBy?: string;
}
