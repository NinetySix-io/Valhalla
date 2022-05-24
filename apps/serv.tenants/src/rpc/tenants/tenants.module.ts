import { AcceptMemberInvitationHandler } from '@app/rpc/tenants/commands/accept.member.invitation.command';
import { CreateTenantHandler } from '@app/rpc/tenants/commands/create.tenant.command';
import { DeleteMemberHandler } from '@app/rpc/tenants/commands/delete.member.command';
import { DeleteTenantHandler } from '@app/rpc/tenants/commands/delete.tenant.command';
import { GetMemberHandler } from '@app/rpc/tenants/queries/get.member.query';
import { GetTenantHandler } from '@app/rpc/tenants/queries/get.tenant.query';
import { InviteMemberHandler } from '@app/rpc/tenants/commands/invite.member.command';
import { Module } from '@nestjs/common';
import { RpcTenantsController } from './tenants.controller';
import { TenantAvailableHandler } from '@app/rpc/tenants/queries/tenant.available.query';
import { TenantMemberSchema } from '@app/entities/tenant.members/schema';
import { TenantMembersModel } from '@app/entities/tenant.members';
import { TenantSchema } from '@app/entities/tenants/schema';
import { TenantsModel } from '@app/entities/tenants';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateMemberHandler } from '@app/rpc/tenants/commands/update.member.command';
import { UpdateTenantHandler } from '@app/rpc/tenants/commands/update.tenant.command';

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
