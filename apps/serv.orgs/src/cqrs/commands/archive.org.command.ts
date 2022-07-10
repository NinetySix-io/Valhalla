import { ArchiveOrgRequest, OrgStatus, Organization } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { OrganizationArchivedEvent } from '../events/org.arhived.event';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';

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
    const organization = await this.organizations.findById(orgId).orFail();

    if (organization.status === OrgStatus.INACTIVE) {
      throw new Error('Organization is already archived');
    }

    organization.status = OrgStatus.INACTIVE;
    organization.updatedBy = toObjectId(requestedUserId);

    await organization.save();

    const serialized = new OrganizationTransformer(organization).proto;

    this.eventBus.publishAll([
      new OrganizationArchivedEvent(serialized),
      new OrganizationUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
