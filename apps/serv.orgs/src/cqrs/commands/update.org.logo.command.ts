import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Organization, UpdateOrgLogoRequest } from '@app/protobuf';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgProto } from '../protos/org.proto';
import { OrganizationLogoUpdatedEventEvent } from '../events/org.logo.url.updated.event';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';

export class UpdateOrgLogoCommand implements ICommand {
  constructor(public readonly request: UpdateOrgLogoRequest) {}
}

@CommandHandler(UpdateOrgLogoCommand)
@RpcHandler()
export class UpdateOrgLogoHandler
  implements ICommandHandler<UpdateOrgLogoCommand, Organization>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly organizations: OrganizationsModel,
  ) {}

  async execute(command: UpdateOrgLogoCommand): Promise<Organization> {
    const { imageUrl, orgId, requestedUserId } = command.request;
    const updatedBy = toObjectId(requestedUserId);
    const organization = await this.organizations
      .findByIdAndUpdate(
        orgId,
        { $set: { logoUrl: imageUrl, updatedBy } },
        { new: true },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgProto).serialize(organization);
    this.eventBus.publishAll([
      new OrganizationUpdatedEvent(serialized),
      new OrganizationLogoUpdatedEventEvent(serialized),
    ]);

    return serialized;
  }
}
