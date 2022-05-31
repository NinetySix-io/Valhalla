import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityRpcClientService } from '@valhalla/serv.clients';
import { isDev } from '@valhalla/utilities';

@Global()
@Module({
  imports: [
    CqrsModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      context: (context: GqlExecutionContext) => context,
      driver: ApolloFederationDriver,
      playground: {
        endpoint: '/graphql',
        settings: { 'request.credentials': 'same-origin' },
      },
      debug: isDev(),
      autoSchemaFile: true,
    }),
  ],
  exports: [CqrsModule],
  providers: [IdentityRpcClientService],
})
export class CoreModule {}
