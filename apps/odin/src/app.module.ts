import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { Environment } from './environment';
import { GqlContext } from '@odin/types/gql.context';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';
import { HealthModule } from './modules/health/health.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from '@odin/middlewares/request.logger';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserAdminOrganizationModule } from './modules/user.admin.organization/user.admin.organization.module';
import { UserModule } from '@odin/modules/user/user.module';
import { UserOrganizationModule } from './modules/user.organization/user.organization.module';

@Module({
  imports: [
    TypegooseModule.forRoot(Environment.variables.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      debug: Environment.isDev,
      autoSchemaFile: true,
      playground: true,
      // pass the original req and res object into the graphql context,
      // get context with decorator `@Context() { req, res, payload, connection }: GqlContext`
      // req, res used in http/query&mutations, connection used in webSockets/subscriptions
      context: ({ req, res, payload, connection }: GqlContext) => ({
        req,
        res,
        payload,
        connection,
      }),
      cors: {
        origin: true,
        credentials: true,
      },
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
  ],
  controllers: [AppController],
  providers: [GraphqlPassportAuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
