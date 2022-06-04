import { AcceptOrgMemberInvitationHandler } from '@app/cqrs/commands/accept.member.invitation.command';
import { CreateOrgHandler } from '@app/cqrs/commands/create.org.command';
import { DeleteOrgHandler } from '@app/cqrs/commands/delete.tenant.command';
import { DeleteOrgMemberHandler } from '@app/cqrs/commands/delete.member.command';
import { GetMemberHandler } from '@app/cqrs/queries/get.member.query';
import { GetOrgHandler } from '@app/cqrs/queries/get.org.query';
import { InviteMemberHandler } from '@app/cqrs/commands/invite.member.command';
import { Module } from '@nestjs/common';
import { OrgAvailableHandler } from '@app/cqrs/queries/org.available.query';
import { OrgMemberSchema } from '@app/entities/org.members/schema';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrgSchema } from '@app/entities/organizations/schema';
import { OrgsModel } from '@app/entities/organizations';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateMemberHandler } from '@app/cqrs/commands/update.member.command';
import { UpdateOrgHandler } from '@app/cqrs/commands/update.tenant.command';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([OrgSchema, OrgMemberSchema])],
  controllers: [gRpcController],
  providers: [
    // DATABASE MODELS
    OrgsModel,
    OrgMembersModel,

    // HANDLERS
    OrgAvailableHandler,
    CreateOrgHandler,
    DeleteOrgHandler,
    UpdateOrgHandler,
    AcceptOrgMemberInvitationHandler,
    DeleteOrgMemberHandler,
    InviteMemberHandler,
    UpdateMemberHandler,
    GetOrgHandler,
    GetMemberHandler,
  ],
})
export class gRpcModule {}
