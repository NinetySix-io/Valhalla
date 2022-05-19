import { GqlUserResolver } from './gql.users.resolver';
import { JwtConfigService } from '@valhalla/serv.core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RpcUsersController } from '@app/rpc/users/users.controller';
import { RpcUsersModule } from '@app/rpc/users/users.module';

@Module({
  providers: [GqlUserResolver, RpcUsersController],
  imports: [
    RpcUsersModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
})
export class GqlUserModule {}
