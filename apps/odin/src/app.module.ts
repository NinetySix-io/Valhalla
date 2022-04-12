import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { Environment } from './config/environment';
import { GraphQLModule } from '@nestjs/graphql';
import { RequestLoggerMiddleware } from '@odin/middlewares/request.logger';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from '@odin/modules/users/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot(Environment.variables.DATABASE_URL),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: Environment.isDev,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
