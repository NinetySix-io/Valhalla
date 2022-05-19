import { BOOT, CONSUL } from '@nestcloud2/common';
import {
  CoreModule,
  HttpExceptionFilter,
  ServiceRegistryModule,
} from '@valhalla/serv.core';

import { APP_FILTER } from '@nestjs/core';
import { ApolloGatewayDriver } from '@nestjs/apollo';
import { ApolloGatewaySetupProvider } from './services/gql.gateway.setup/gql.gateway.setup.module';
import { BootModule } from '@nestcloud2/boot';
import { ConsulModule } from '@nestcloud2/consul';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RestHealthModule } from './rest/health/health.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServiceModule } from '@nestcloud2/service';
import { configFilePath } from './constants';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    BootModule.forRoot({ filePath: configFilePath }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      driver: ApolloGatewayDriver,
      useClass: ApolloGatewaySetupProvider,
    }),
    RestHealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
