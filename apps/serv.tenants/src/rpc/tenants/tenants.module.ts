import { AcceptMemberInvitationHandler } from '@serv.tenants/rpc/tenants/commands/accept.member.invitation.command';
import { CreateTenantHandler } from '@serv.tenants/rpc/tenants/commands/create.tenant.command';
import { DeleteMemberHandler } from '@serv.tenants/rpc/tenants/commands/delete.member.command';
import { DeleteTenantHandler } from '@serv.tenants/rpc/tenants/commands/delete.tenant.command';
import { GetMemberHandler } from '@serv.tenants/rpc/tenants/queries/get.member.query';
import { GetTenantHandler } from '@serv.tenants/rpc/tenants/queries/get.tenant.query';
import { InviteMemberHandler } from '@serv.tenants/rpc/tenants/commands/invite.member.command';
import { Module } from '@nestjs/common';
import { RpcTenantsController } from './tenants.controller';
import { TenantAvailableHandler } from '@serv.tenants/rpc/tenants/commands/tenant.available.command';
import { TenantMemberSchema } from '@serv.tenants/entities/tenant.members/schema';
import { TenantMembersModel } from '@serv.tenants/entities/tenant.members';
import { TenantSchema } from '@serv.tenants/entities/tenants/schema';
import { TenantsModel } from '@serv.tenants/entities/tenants';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateMemberHandler } from '@serv.tenants/rpc/tenants/commands/update.member.command';
import { UpdateTenantHandler } from '@serv.tenants/rpc/tenants/commands/update.tenant.command';

@Module({
  imports: [TypegooseModule.forFeature([TenantSchema, TenantMemberSchema])],
  controllers: [RpcTenantsController],
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
export class RpcTenantsModule {}
