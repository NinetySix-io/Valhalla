import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import {
  SiteStatus,
  SuspendSiteRequest,
  SuspendSiteResponse,
} from '@app/protobuf';

import { SiteSuspendedEvent } from '../events/site.suspended.event';
import { SiteTransformer } from '@app/entities/sites/transformer';
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
    const { requestedUserId, organizationId, siteId } = command.request;
    const _id = toObjectId(siteId);
    const updatedBy = toObjectId(requestedUserId);
    const organization = toObjectId(organizationId);
    const status = SiteStatus.SUSPENDED;
    const site = await this.sites
      .findOneAndUpdate(
        { _id, organization },
        { $set: { updatedBy, status } },
        { new: true },
      )
      .orFail(() => new Error('Site not found!'));

    const serialized = new SiteTransformer(site).proto;

    this.eventBus.publish(new SiteSuspendedEvent(serialized));

    return {
      site: serialized,
    };
  }
}