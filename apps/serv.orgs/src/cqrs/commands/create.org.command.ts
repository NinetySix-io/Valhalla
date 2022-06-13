import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateOrgRequest, Organization } from '@app/protobuf';
import {
  OrgMemberRole,
  OrgMemberStatus,
} from '@app/entities/org.members/schema';
import {
  OrganizationPlan,
  OrganizationStatus,
} from '@app/entities/organizations/schema';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { OrgMemberTransformer } from '@app/entities/org.members/transformer';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrganizationCreatedEvent } from '../events/org.created.event';
import { OrganizationMemberCreatedEvent } from '../events/org.member.created.event';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationsModel } from '@app/entities/organizations';
import { ServIdentity } from '@valhalla/serv.clients';
import { slugify } from '@valhalla/utilities';

export class CreateOrgCommand implements ICommand {
  constructor(
    public readonly input: CreateOrgRequest,
    public readonly user?: ServIdentity.Account,
  ) {}
}

@CommandHandler(CreateOrgCommand)
@RpcHandler()
export class CreateOrgHandler
  implements ICommandHandler<CreateOrgCommand, Organization>
{
  constructor(
    private readonly organizations: OrganizationsModel,
    private readonly members: OrgMembersModel,
    private readonly eventBus: EventBus,
  ) {}

  private async generateSlug(name: string) {
    let slug = slugify(name.toLowerCase());
    const count = await this.organizations.count({ slug });
    if (count > 0) {
      slug += `-${count}`;
    }

    return slug;
  }

  async execute(command: CreateOrgCommand): Promise<Organization> {
    if (!command.user?.id) {
      throw new Error('User is not defined');
    } else if (command.input.name) {
      throw new Error('Org name is not defined');
    }

    const slug = await this.generateSlug(command.input.name);
    const userId = toObjectId(command.user.id);

    //TODO: maybe limit org creation per account
    const tenant = await this.organizations.create({
      slug,
      name: command.input.name,
      plan: OrganizationPlan.FREE,
      status: OrganizationStatus.ACTIVE,
      createdBy: userId,
      updatedBy: userId,
    });

    const member = await this.members.create({
      user: userId,
      organization: tenant._id,
      status: OrgMemberStatus.Accepted,
      role: OrgMemberRole.Owner,
      updatedBy: userId,
      invitedBy: userId,
    });

    const orgSerialized = new OrganizationTransformer(tenant).proto;
    const memberSerialized = new OrgMemberTransformer(member).proto;

    await this.eventBus.publishAll([
      new OrganizationCreatedEvent(orgSerialized),
      new OrganizationMemberCreatedEvent(memberSerialized),
    ]);

    return orgSerialized;
  }
}
