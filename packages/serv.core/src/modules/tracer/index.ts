import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TracerInterceptor } from './interceptor';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TracerInterceptor,
    },
  ],
})
export class TracerModule {}
