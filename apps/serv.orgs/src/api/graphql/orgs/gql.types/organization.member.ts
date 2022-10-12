import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InvitationStatus, OrgRole } from '@app/protobuf';

import { IsObjectId } from '@valhalla/serv.core';
import { OrgMemberProto } from '@app/cqrs/protos/org.member.proto';

registerEnumType(InvitationStatus, { name: 'InvitationStatus' });
registerEnumType(OrgRole, { name: 'OrganizationRole' });

@ObjectType()
export class OrganizationMember implements OrgMemberProto {
  id: string;

  @Field()
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

  @Field()
  @IsObjectId()
  updatedBy: string;

  @Field({ nullable: true })
  profileImageUrl?: string;

  organization: string;

  invitedBy?: string;
}
