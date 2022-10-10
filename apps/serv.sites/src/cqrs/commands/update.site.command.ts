import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';
import { UpdateSiteRequest, UpdateSiteResponse } from '@app/protobuf';

import { SiteProto } from '../transformers/site.proto';
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
    const _id = toObjectId(siteId);
    const updatedBy = toObjectId(requestedUserId);
    const site = await this.sites
      .findOneAndUpdate(
        { _id },
        { $set: { name, updatedBy } },
        { withoutNil: true, new: true },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(SiteProto).serialize(site);
    this.eventBus.publish(new SiteUpdatedEvent(serialized));
    return { data: serialized };
  }
}
