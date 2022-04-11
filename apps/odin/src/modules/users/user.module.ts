import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, GraphqlPassportAuthGuard],
})
export class UsersModule {}
