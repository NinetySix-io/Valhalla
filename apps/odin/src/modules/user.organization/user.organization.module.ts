import { Module } from '@nestjs/common';
import { OrganizationSchema } from '@odin/data.models/organizations/schema';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { UserOrganizationResolver } from './user.organization.resolver';

@Module({
  imports: [
    TypegooseModule.forFeature([OrganizationSchema, UserMembershipSchema]),
  ],
  providers: [
    UserMembershipsModel,
    OrganizationsModel,
    UserOrganizationResolver,
  ],
})
export class UserOrganizationModule {}
