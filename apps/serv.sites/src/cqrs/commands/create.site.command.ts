import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreatePayload,
  RpcHandler,
  Serializer,
  toObjectId,
} from '@valhalla/serv.core';
import {
  CreateSiteRequest,
  CreateSiteResponse,
  SiteStatus,
} from '@app/protobuf';

import { SiteCreatedEvent } from '../events/site.created.event';
import { SiteProto } from '../transformers/site.proto';
import { SiteSchema } from '@app/entities/sites/schema';
import { SitesModel } from '@app/entities/sites';

export class CreateSiteCommand implements ICommand {
  constructor(public readonly request: CreateSiteRequest) {}
}

@CommandHandler(CreateSiteCommand)
@RpcHandler()
export class CreateSiteHandler
  implements ICommandHandler<CreateSiteCommand, CreateSiteResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly sites: SitesModel,
  ) {}

  async execute(command: CreateSiteCommand): Promise<CreateSiteResponse> {
    const { requestedUserId, ownerId, name } = command.request;
    const ownBy = toObjectId(ownerId);
    const createdBy = toObjectId(requestedUserId);
    const updatedBy = createdBy;
    const status = SiteStatus.PENDING;
    const payload: CreatePayload<SiteSchema> = {
      name,
      ownBy,
      createdBy,
      updatedBy,
      status,
    };

    const site = await this.sites.create(payload);
    const serialized = Serializer.from(SiteProto).serialize(site.toJSON());
    const event = new SiteCreatedEvent(serialized);
    this.eventBus.publish(event);
    return { data: serialized };
  }
}
