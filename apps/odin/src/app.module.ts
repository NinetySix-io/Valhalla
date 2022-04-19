import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { Environment } from './environment';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthModule } from './modules/health/health.module';
import { OrganizationModule } from '@odin/modules/organization/organization.module';
import { RequestLoggerMiddleware } from '@odin/middlewares/request.logger';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '@odin/modules/user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot(Environment.variables.DATABASE_URL),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: Environment.isDev,
      autoSchemaFile: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    AuthModule,
    HealthModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
