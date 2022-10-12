import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Organization, UpdateOrgPlanRequest } from '@app/protobuf';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgProto } from '../protos/org.proto';
import { OrganizationPlanUpdatedEvent } from '../events/org.plan.updated.event';
import { OrganizationUpdatedEvent } from '../events/org.updated.event';
import { OrganizationsModel } from '@app/entities/organizations';

export class UpdateOrgPlanCommand implements ICommand {
  constructor(public readonly request: UpdateOrgPlanRequest) {}
}

@CommandHandler(UpdateOrgPlanCommand)
@RpcHandler()
export class UpdateOrgPlanHandler
  implements ICommandHandler<UpdateOrgPlanCommand, Organization>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly organizations: OrganizationsModel,
  ) {}

  async execute(command: UpdateOrgPlanCommand): Promise<Organization> {
    const plan = command.request.plan;
    const orgId = toObjectId(command.request.orgId);
    const updatedBy = toObjectId(command.request.requestedUserId);
    const organization = await this.organizations
      .findOneAndUpdate(
        { _id: orgId, plan: { $ne: plan } },
        { $set: { updatedBy, plan } },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgProto).serialize(organization);
    this.eventBus.publishAll([
      new OrganizationUpdatedEvent(serialized),
      new OrganizationPlanUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
