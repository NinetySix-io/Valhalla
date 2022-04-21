import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserAdminOrganizationResolver } from './user.admin.organization.resolver';
import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';

@Module({
  imports: [TypegooseModule.forFeature([UserMembershipSchema])],
  providers: [UserMembershipsModel, UserAdminOrganizationResolver],
})
export class UserAdminOrganizationModule {}
