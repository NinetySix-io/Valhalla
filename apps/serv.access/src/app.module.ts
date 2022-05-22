import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { APP_FILTER } from '@nestjs/core';
import { BootModule } from '@nestcloud2/boot';
import { CasbinConfigService } from './services/casbin.config.service';
import { GqlModules } from './gql';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { NestCasbinModule } from 'nestjs-casbin';
import { RestModules } from './rest';
import { RpcModules } from './rpc';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';
import { isDev } from '@valhalla/utilities';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
    NestCasbinModule.registerAsync({ useClass: CasbinConfigService }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      debug: isDev(),
      playground: true,
      autoSchemaFile: true,
      context: ({ req, res, payload, connection }) => ({
        req,
        res,
        payload,
        connection,
      }),
    }),
    ...RestModules,
    ...RpcModules,
    ...GqlModules,
  ],
  controllers: [],
})
export class AppModule {}
