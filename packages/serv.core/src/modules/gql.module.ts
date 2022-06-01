import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';

import { Module } from '@nestjs/common';
import { isDev } from '@valhalla/utilities';

@Module({
  imports: [
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
})
export class GqlModule {}
