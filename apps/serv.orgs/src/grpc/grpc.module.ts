import { AccountSettingSchema } from '@app/entities/account.settings/schema';
import { AccountSettingsModel } from '@app/entities/account.settings';
import { ArchiveOrgHandler } from '@app/cqrs/commands/archive.org.command';
import { CreateOrgHandler } from '@app/cqrs/commands/create.org.command';
import { GetAccountActiveOrgHandler } from '@app/cqrs/queries/get.account.active.org.query';
import { GetMemberHandler } from '@app/cqrs/queries/get.member.query';
import { GetOrgHandler } from '@app/cqrs/queries/get.org.query';
import { GetUserMembershipsHandler } from '@app/cqrs/queries/get.user.memberships.query';
import { MarkDeleteOrgMemberHandler } from '@app/cqrs/commands/mark.delete.member.command';
import { Module } from '@nestjs/common';
import { OrgMemberSchema } from '@app/entities/org.members/schema';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrganizationSchema } from '@app/entities/organizations/schema';
import { OrganizationsModel } from '@app/entities/organizations';
import { RestoreOrgHandler } from '@app/cqrs/commands/restore.org.command';
import { SetAccountActiveOrgHandler } from '@app/cqrs/commands/set.account.active.org.command';
import { TypegooseModule } from 'nestjs-typegoose';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      OrganizationSchema,
      OrgMemberSchema,
      AccountSettingSchema,
    ]),
  ],
  controllers: [gRpcController],
  providers: [
    // DATABASE MODELS
    OrganizationsModel,
    OrgMembersModel,
    AccountSettingsModel,

    ArchiveOrgHandler,
    CreateOrgHandler,
    MarkDeleteOrgMemberHandler,
    RestoreOrgHandler,
    GetAccountActiveOrgHandler,
    SetAccountActiveOrgHandler,

    GetOrgHandler,
    GetMemberHandler,
    GetUserMembershipsHandler,
  ],
})
export class gRpcModule {}
