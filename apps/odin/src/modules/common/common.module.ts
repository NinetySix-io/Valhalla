import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({})
export class CommonModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {}
}
