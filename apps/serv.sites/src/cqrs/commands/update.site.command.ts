import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import { UpdateSiteRequest, UpdateSiteResponse } from '@app/protobuf';

import { SiteTransformer } from '@app/entities/sites/transformer';
import { SiteUpdatedEvent } from '../events/site.updated.event';
import { SitesModel } from '@app/entities/sites';

export class UpdateSiteCommand implements ICommand {
  constructor(public readonly request: UpdateSiteRequest) {}
}

@CommandHandler(UpdateSiteCommand)
@RpcHandler()
export class UpdateSiteHandler
  implements ICommandHandler<UpdateSiteCommand, UpdateSiteResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly sites: SitesModel,
  ) {}

  async execute(command: UpdateSiteCommand): Promise<UpdateSiteResponse> {
    const { requestedUserId, siteId, name } = command.request;
    const updatedBy = toObjectId(requestedUserId);
    const site = await this.sites.findOneAndUpdate(
      { _id: toObjectId(siteId) },
      { $set: { name, updatedBy } },
      { withoutNil: true, new: true },
    );
    const serialized = new SiteTransformer(site).proto;
    this.eventBus.publish(new SiteUpdatedEvent(serialized));

    return {
      site: serialized,
    };
  }
}
