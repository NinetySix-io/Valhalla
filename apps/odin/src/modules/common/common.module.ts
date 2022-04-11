import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DateScalar } from './scalars/date.scalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
