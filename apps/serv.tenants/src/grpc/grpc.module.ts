import { AcceptMemberInvitationHandler } from '@app/cqrs/commands/accept.member.invitation.command';
import { CreateTenantHandler } from '@app/cqrs/commands/create.tenant.command';
import { DeleteMemberHandler } from '@app/cqrs/commands/delete.member.command';
import { DeleteTenantHandler } from '@app/cqrs/commands/delete.tenant.command';
import { GetMemberHandler } from '@app/cqrs/queries/get.member.query';
import { GetTenantHandler } from '@app/cqrs/queries/get.tenant.query';
import { InviteMemberHandler } from '@app/cqrs/commands/invite.member.command';
import { Module } from '@nestjs/common';
import { TenantAvailableHandler } from '@app/cqrs/queries/tenant.available.query';
import { TenantMemberSchema } from '@app/entities/tenant.members/schema';
import { TenantMembersModel } from '@app/entities/tenant.members';
import { TenantSchema } from '@app/entities/tenants/schema';
import { TenantsModel } from '@app/entities/tenants';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateMemberHandler } from '@app/cqrs/commands/update.member.command';
import { UpdateTenantHandler } from '@app/cqrs/commands/update.tenant.command';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([TenantSchema, TenantMemberSchema])],
  controllers: [gRpcController],
  providers: [
    // DATABASE MODELS
    TenantsModel,
    TenantMembersModel,

    // HANDLERS
    TenantAvailableHandler,
    CreateTenantHandler,
    DeleteTenantHandler,
    UpdateTenantHandler,
    AcceptMemberInvitationHandler,
    DeleteMemberHandler,
    InviteMemberHandler,
    UpdateMemberHandler,
    GetTenantHandler,
    GetMemberHandler,
  ],
})
export class gRpcModule {}
