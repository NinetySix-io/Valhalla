import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { UsersModel } from '@serv.odin/data.models/users';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [TypegooseModule.forFeature([UserSchema])],
  providers: [UsersModel, UsersResolver],
})
export class UserModule {}