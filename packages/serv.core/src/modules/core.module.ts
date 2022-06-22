import { Global, Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncContextModule } from '@nestjs-steroids/async-context';
import { AuthModule } from './auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpContextModule } from '../modules/http.context';
import { IdentityRpcClientService } from '@valhalla/serv.clients';
import { TracerInterceptor } from './tracer/interceptor';

@Global()
@Module({
  imports: [
    CqrsModule,
    AuthModule,
    AsyncContextModule.forRoot(),
    HttpContextModule,
  ],
  exports: [CqrsModule],
  providers: [
    IdentityRpcClientService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracerInterceptor,
    },
  ],
})
export class CoreModule {}
