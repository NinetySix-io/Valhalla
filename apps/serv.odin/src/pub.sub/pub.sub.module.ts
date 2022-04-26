import { Global, Module } from '@nestjs/common';

import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB' as const;

@Global()
@Module({
  providers: [{ provide: PUB_SUB, useClass: PubSub }],
  exports: [PUB_SUB],
})
export class PubSubModule {}
