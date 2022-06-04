import { ArchiveOrgRequest, Organization } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';

import { OrganizationArchivedEvent } from '../events/org.arhived.event';
import { OrganizationStatus } from '@app/entities/organizations/schema';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';
import { RpcHandler } from '@valhalla/serv.core';
import mongoose from 'mongoose';

export class ArchiveOrgCommand implements ICommand {
  constructor(public readonly input: ArchiveOrgRequest) {}
}

@CommandHandler(ArchiveOrgCommand)
@RpcHandler()
export class ArchiveOrgHandler
  implements ICommandHandler<ArchiveOrgCommand, Organization>
{
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ArchiveOrgCommand): Promise<Organization> {
    const { requestedUserId, orgId } = command.input;
    const organization = await this.organizations
      .findById(orgId)
      .orFail(() => new Error('Organization not found!'));

    if (organization.status === OrganizationStatus.ARCHIVED) {
      throw new Error('Organization is already archived');
    }

    organization.status = OrganizationStatus.ARCHIVED;
    organization.updatedBy = new mongoose.Types.ObjectId(requestedUserId);

    await organization.save();

    const serialized = new OrganizationTransformer(organization).proto;

    this.eventBus.publishAll([
      new OrganizationArchivedEvent(serialized),
      new OrganizationUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
