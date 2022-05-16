import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@valhalla/serv.core';

import { AcceptMemberInvitationHandler } from '@serv.tenants/cqrs/commands/accept.member.invitation.command';
import { CreateTenantHandler } from '@serv.tenants/cqrs/commands/create.tenant.command';
import { DeleteMemberHandler } from '@serv.tenants/cqrs/commands/delete.member.command';
import { DeleteTenantHandler } from '@serv.tenants/cqrs/commands/delete.tenant.command';
import { GetMemberHandler } from '@serv.tenants/cqrs/queries/get.member.query';
import { GetTenantHandler } from '@serv.tenants/cqrs/queries/get.tenant.query';
import { InviteMemberHandler } from '@serv.tenants/cqrs/commands/invite.member.command';
import { Module } from '@nestjs/common';
import { TenantAvailableHandler } from '@serv.tenants/cqrs/commands/tenant.available.command';
import { TenantCreatedEvent } from '@serv.tenants/cqrs/events/tenant.created.event';
import { TenantMembersModel } from '@serv.tenants/entities/tenant.members';
import { TenantsController } from './tenants.controller';
import { TenantsModel } from '@serv.tenants/entities/tenants';
import { UpdateMemberHandler } from '@serv.tenants/cqrs/commands/update.member.command';
import { UpdateTenantHandler } from '@serv.tenants/cqrs/commands/update.tenant.command';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      featureStreamName: '$ce-tenant',
      type: 'event-store',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-tenant',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-point',
        },
      ],
      eventHandlers: {
        TenantCreatedEvent: (data) => new TenantCreatedEvent(data),
      },
    }),
  ],
  controllers: [TenantsController],
  providers: [
    TenantsModel,
    TenantMembersModel,
    TenantAvailableHandler,
    CreateTenantHandler,
    DeleteTenantHandler,
    UpdateTenantHandler,
    AcceptMemberInvitationHandler,
    DeleteMemberHandler,
    InviteMemberHandler,
    UpdateMemberHandler,
    GetTenantHandler,
    GetMemberHandler,
  ],
})
export class TenantsModule {}
