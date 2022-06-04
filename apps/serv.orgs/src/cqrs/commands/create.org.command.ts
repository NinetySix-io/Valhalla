import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateOrgRequest, CreateOrgResponse } from '@app/protobuf';
import {
  OrgMemberRole,
  OrgMemberStatus,
} from '@app/entities/org.members/schema';

import { OrgCreatedEvent } from '../events/org.created.event';
import { OrgMemberCreatedEvent } from '../events/org.member.created.event';
import { OrgMemberTransformer } from '@app/entities/org.members/transformer';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrgPlan } from '@app/entities/organizations/schema';
import { OrgTransformer } from '@app/entities/organizations/transformer';
import { OrgsModel } from '@app/entities/organizations';
import { RpcHandler } from '@valhalla/serv.core';
import { ServIdentity } from '@valhalla/serv.clients';
import mongoose from 'mongoose';
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
  implements ICommandHandler<CreateOrgCommand, CreateOrgResponse>
{
  constructor(
    private readonly organizations: OrgsModel,
    private readonly members: OrgMembersModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateOrgCommand): Promise<CreateOrgResponse> {
    if (!command.user?.id) {
      throw new Error('User is not defined');
    } else if (command.input.name) {
      throw new Error('Org name is not defined');
    }

    const slug = slugify(command.input.name.toLowerCase());
    const isAlreadyExists = await this.organizations.exists({ slug });
    if (isAlreadyExists) {
      throw new Error('Org name is taken!');
    }

    const userId = new mongoose.Types.ObjectId(command.user.id);
    const tenant = await this.organizations.create({
      slug,
      name: command.input.name,
      plan: OrgPlan.FREE,
      createdBy: userId,
    });

    const member = await this.members.create({
      user: userId,
      organization: tenant._id,
      status: OrgMemberStatus.Accepted,
      role: OrgMemberRole.Owner,
    });

    const orgSerialized = new OrgTransformer(tenant).proto;
    const memberSerialized = new OrgMemberTransformer(member).proto;

    await this.eventBus.publishAll([
      new OrgCreatedEvent(orgSerialized),
      new OrgMemberCreatedEvent(memberSerialized),
    ]);

    return {
      Organization: orgSerialized,
    };
  }
}
