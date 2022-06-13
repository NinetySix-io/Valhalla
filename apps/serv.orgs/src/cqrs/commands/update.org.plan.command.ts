import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { Organization, UpdateOrgPlanRequest } from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { OrganizationPlan } from '@app/entities/organizations/schema';
import { OrganizationPlanUpdatedEvent } from '../events/org.plan.updated.event';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
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
    const { plan, orgId, requestedUserId } = command.request;
    const organization = await this.organizations
      .findById(orgId)
      .orFail(() => new Error('Organization not found!'));

    //TODO: more logic
    organization.plan = plan as unknown as OrganizationPlan;
    organization.updatedBy = toObjectId(requestedUserId);
    organization.save();
    const serialized = new OrganizationTransformer(organization).proto;

    this.eventBus.publishAll([
      new OrganizationUpdatedEvent(serialized),
      new OrganizationPlanUpdatedEvent(serialized),
    ]);

    return serialized;
  }
}
