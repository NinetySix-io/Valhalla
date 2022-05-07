import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@valhalla/serv.core';

import { AccessController } from './access.controller';
import { CreateAccessHandler } from '@serv.iam/cqrs/commands/create.access.command';
import { DeleteAccessHandler } from '@serv.iam/cqrs/commands/delete.access.command';
import { FindAccessHandler } from '@serv.iam/cqrs/queries/find.access.query';
import { HasRightsHandler } from '@serv.iam/cqrs/queries/has.rights.query';
import { Module } from '@nestjs/common';
import { ReadAccessHandler } from '@serv.iam/cqrs/queries/read.access.query';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-webhook',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-webhook',
        },
      ],
      eventHandlers: {},
    }),
  ],
  controllers: [AccessController],
  providers: [
    CreateAccessHandler,
    DeleteAccessHandler,
    ReadAccessHandler,
    FindAccessHandler,
    HasRightsHandler,
  ],
})
export class AccessModule {}
