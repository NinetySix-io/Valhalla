import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { BootModule } from '@nestcloud2/boot';
import { GqlModules } from '@app/gql';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RestModules } from './rest';
import { RpcModules } from './rpc';
import { TypegooseModule } from 'nestjs-typegoose';
import { configFilePath } from './constants';
import { isDev } from '@valhalla/utilities';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    BootModule.forRoot({ filePath: configFilePath }),
    TypegooseModule.forRootAsync({ useClass: MongoConfigService }),
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

    ...RpcModules,
    ...RestModules,
    ...GqlModules,
  ],
})
export class AppModule {}
