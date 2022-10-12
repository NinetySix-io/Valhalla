import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateOrgRequest,
  InvitationStatus,
  OrgPlan,
  OrgRole,
  OrgStatus,
  Organization,
} from '@app/protobuf';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgMemberProto } from '../protos/org.member.proto';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrgProto } from '../protos/org.proto';
import { OrganizationCreatedEvent } from '../events/org.created.event';
import { OrganizationMemberCreatedEvent } from '../events/org.member.created.event';
import { OrganizationsModel } from '@app/entities/organizations';
import { slugify } from '@valhalla/utilities';

export class CreateOrgCommand implements ICommand {
  constructor(public readonly request: CreateOrgRequest) {}
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
    let slug = slugify(name, { trim: true, lower: true });
    const count = await this.organizations.count({ slug });
    if (count > 0) {
      slug += `-${count}`;
    }

    return slug;
  }

  async execute(command: CreateOrgCommand): Promise<Organization> {
    const slug = await this.generateSlug(command.request.name);
    const userId = toObjectId(command.request.requestedUserId);

    //TODO: maybe limit org creation per account
    const tenant = await this.organizations.create({
      slug,
      name: command.request.name,
      plan: OrgPlan.FREE,
      status: OrgStatus.ACTIVE,
      createdBy: userId,
      updatedBy: userId,
    });

    const member = await this.members.create({
      user: userId,
      organization: tenant._id,
      status: InvitationStatus.ACCEPTED,
      role: OrgRole.OWNER,
      updatedBy: userId,
      invitedBy: userId,
    });

    const orgSerialized = Serializer.from(OrgProto).serialize(tenant.toJSON());
    const memberSerialized = Serializer.from(OrgMemberProto).serialize(
      member.toJSON(),
    );

    await this.eventBus.publishAll([
      new OrganizationCreatedEvent(orgSerialized),
      new OrganizationMemberCreatedEvent(memberSerialized),
    ]);

    return orgSerialized;
  }
}
