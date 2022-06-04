import { ArchiveOrgHandler } from '@app/cqrs/commands/archive.org.command';
import { CreateOrgHandler } from '@app/cqrs/commands/create.org.command';
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
import { TypegooseModule } from 'nestjs-typegoose';
import { gRpcController } from './grpc.controller';

@Module({
  imports: [TypegooseModule.forFeature([OrganizationSchema, OrgMemberSchema])],
  controllers: [gRpcController],
  providers: [
    // DATABASE MODELS
    OrganizationsModel,
    OrgMembersModel,

    ArchiveOrgHandler,
    CreateOrgHandler,
    MarkDeleteOrgMemberHandler,
    RestoreOrgHandler,

    GetOrgHandler,
    GetMemberHandler,
    GetUserMembershipsHandler,
  ],
})
export class gRpcModule {}
