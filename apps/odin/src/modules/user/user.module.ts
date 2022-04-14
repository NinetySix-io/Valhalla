import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserSchema } from '@odin/data.models/users/schema';
import { UsersModel } from '@odin/data.models/users';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [TypegooseModule.forFeature([UserSchema])],
  providers: [UsersModel, UsersResolver, GraphqlPassportAuthGuard],
})
export class UsersModule {}
