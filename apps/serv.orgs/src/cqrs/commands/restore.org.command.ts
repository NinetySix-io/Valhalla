import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Organization, RestoreOrgRequest } from '@app/protobuf';

import { OrganizationRestoredEvent } from '../events/org.restored.event';
import { OrganizationStatus } from '@app/entities/organizations/schema';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';
import { RpcHandler } from '@valhalla/serv.core';
import mongoose from 'mongoose';

export class RestoreOrgCommand implements ICommand {
  constructor(public readonly input: RestoreOrgRequest) {}
}

@CommandHandler(RestoreOrgCommand)
@RpcHandler()
export class RestoreOrgHandler
  implements ICommandHandler<RestoreOrgCommand, Organization>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly organizations: OrganizationsModel,
  ) {}

  async execute(command: RestoreOrgCommand): Promise<Organization> {
    const { orgId, requestedUserId } = command.input;
    const organization = await this.organizations
      .findById(orgId)
      .orFail(() => new Error('Organization not found!'));

    if (organization.status === OrganizationStatus.ACTIVE) {
      throw new Error('Organization is already active');
    }

    organization.status = OrganizationStatus.ACTIVE;
    organization.updatedBy = new mongoose.Types.ObjectId(requestedUserId);

    await organization.save();

    const serialized = new OrganizationTransformer(organization).proto;

    this.eventBus.publishAll([
      new OrganizationRestoredEvent(serialized),
      new OrganizationUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}