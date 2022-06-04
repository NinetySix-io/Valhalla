import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Organization, UpdateOrgLogoRequest } from '@app/protobuf';

import { OrganizationLogoUpdatedEventEvent } from '../events/org.logo.url.updated.event';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';
import { RpcHandler } from '@valhalla/serv.core';
import mongoose from 'mongoose';

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
    const organization = await this.organizations
      .findById(orgId)
      .orFail(() => new Error('Organization not found!'));

    organization.logoUrl = imageUrl;
    organization.updatedBy = new mongoose.Types.ObjectId(requestedUserId);
    organization.save();
    const serialized = new OrganizationTransformer(organization).proto;

    this.eventBus.publishAll([
      new OrganizationUpdatedEvent(serialized),
      new OrganizationLogoUpdatedEventEvent(serialized),
    ]);

    return serialized;
  }
}
