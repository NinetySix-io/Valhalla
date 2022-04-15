import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { Module } from '@nestjs/common';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationSchema } from '@odin/data.models/organizations/schema';
import { OrganizationsModel } from '@odin/data.models/organizations';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserMembershipSchema } from '@odin/data.models/user.memberships/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';
import { UserSchema } from '@odin/data.models/users/schema';
import { UsersModel } from '@odin/data.models/users';

@Module({
  imports: [
    TypegooseModule.forFeature([
      UserSchema,
      OrganizationSchema,
      UserMembershipSchema,
    ]),
  ],
  providers: [
    UsersModel,
    UserMembershipsModel,
    OrganizationsModel,
    OrganizationResolver,
    GraphqlPassportAuthGuard,
  ],
})
export class OrganizationModule {}
