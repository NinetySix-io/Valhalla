import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateSiteRequest,
  CreateSiteResponse,
  SiteStatus,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { SiteCreatedEvent } from '../events/site.created.event';
import { SiteTransformer } from '@app/entities/sites/transformer';
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
    const { requestedUserId, owner, name } = command.request;
    const ownBy = toObjectId(owner);
    const createdBy = toObjectId(requestedUserId);
    const updatedBy = createdBy;
    const status = SiteStatus.PENDING;
    const site = await this.sites.create({
      name,
      ownBy,
      createdBy,
      updatedBy,
      status,
    });

    this.eventBus.publish(
      new SiteCreatedEvent(new SiteTransformer(site).proto),
    );

    return {
      siteId: site.id,
      status: site.status,
    };
  }
}
