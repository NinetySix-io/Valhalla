import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { OrgStatus, Organization, RestoreOrgRequest } from '@app/protobuf';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgProto } from '../protos/org.proto';
import { OrganizationRestoredEvent } from '../events/org.restored.event';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';

export class RestoreOrgCommand implements ICommand {
  constructor(public readonly request: RestoreOrgRequest) {}
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
    const orgId = toObjectId(command.request.orgId);
    const updatedBy = toObjectId(command.request.orgId);
    const organization = await this.organizations
      .findOneAndUpdate(
        { _id: orgId, status: { $ne: OrgStatus.ACTIVE } },
        { $set: { status: OrgStatus.ACTIVE, updatedBy } },
        { new: true },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgProto).serialize(organization);
    this.eventBus.publishAll([
      new OrganizationRestoredEvent(serialized),
      new OrganizationUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
