import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { Environment } from './environment';
import { GqlContext } from '@serv.odin/types/gql.context';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlPassportAuthGuard } from '@serv.odin/guards/auth.guard';
import { HealthModule } from './modules/health/health.module';
import { ParamValidationPipe } from './pipes/param.validation';
import { RequestLoggerMiddleware } from '@serv.odin/middlewares/request.logger';
import { SiteModule } from './modules/site/site.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserAdminOrganizationModule } from './modules/user.admin.organization/user.admin.organization.module';
import { UserModule } from '@serv.odin/modules/user/user.module';
import { UserOrganizationModule } from './modules/user.organization/user.organization.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: async () => ({
        uri: Environment.variables.DATABASE_URL,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      debug: Environment.isDev,
      cors: Environment.isDev ? { credentials: true } : false,
      playground: Environment.isDev
        ? { settings: { 'request.credentials': 'include' } }
        : false,

      // pass the original req and res object into the graphql context,
      // get context with decorator `@Context() { req, res, payload, connection }: GqlContext`
      // req, res used in http/query&mutations, connection used in webSockets/subscriptions
      context: ({ req, res, payload, connection }: GqlContext) => ({
        req,
        res,
        payload,
        connection,
      }),
      // subscriptions: {
      //   'graphql-ws': true,
      // },
    }),
    // PubSubModule,
    AuthModule,
    HealthModule,
    UserModule,
    UserOrganizationModule,
    UserAdminOrganizationModule,
    SiteModule,
  ],
  controllers: [AppController],
  providers: [GraphqlPassportAuthGuard, ParamValidationPipe],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
