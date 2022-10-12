import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';
import {
  SiteStatus,
  SuspendSiteRequest,
  SuspendSiteResponse,
} from '@app/protobuf';

import { SiteProto } from '../protos/site.proto';
import { SiteSuspendedEvent } from '../events/site.suspended.event';
import { SitesModel } from '@app/entities/sites';

export class SuspendSiteCommand implements ICommand {
  constructor(public readonly request: SuspendSiteRequest) {}
}

@CommandHandler(SuspendSiteCommand)
@RpcHandler()
export class SuspendSiteHandler
  implements ICommandHandler<SuspendSiteCommand, SuspendSiteResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly sites: SitesModel,
  ) {}

  async execute(command: SuspendSiteCommand): Promise<SuspendSiteResponse> {
    const { requestedUserId, siteId } = command.request;
    const _id = toObjectId(siteId);
    const updatedBy = toObjectId(requestedUserId);
    const status = SiteStatus.SUSPENDED;
    const site = await this.sites
      .findOneAndUpdate({ _id }, { $set: { updatedBy, status } }, { new: true })
      .lean()
      .orFail();

    const serialized = Serializer.from(SiteProto).serialize(site);
    this.eventBus.publish(new SiteSuspendedEvent(serialized));
    return { data: serialized };
  }
}
