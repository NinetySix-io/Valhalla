import { ArchiveOrgRequest, OrgStatus, Organization } from '@app/protobuf';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgProto } from '../protos/org.proto';
import { OrganizationArchivedEvent } from '../events/org.archived.event';
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
    const orgId = toObjectId(command.input.orgId);
    const updatedBy = toObjectId(command.input.requestedUserId);
    const organization = await this.organizations
      .findOneAndUpdate(
        { _id: orgId, status: { $ne: OrgStatus.INACTIVE } },
        {
          $set: {
            status: OrgStatus.INACTIVE,
            updatedBy,
          },
        },
        {
          new: true,
        },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgProto).serialize(organization);
    this.eventBus.publishAll([
      new OrganizationArchivedEvent(serialized),
      new OrganizationUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
