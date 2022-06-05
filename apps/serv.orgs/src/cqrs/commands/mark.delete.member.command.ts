import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  MarkDeleteMemberRequest,
  MarkDeleteMemberResponse,
} from '@app/protobuf';

import { OrgMemberTransformer } from '@app/entities/org.members/transformer';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrganizationMemberDeletingEvent } from '../events/org.member.deleting.event';
import { OrganizationMemberUpdatedEvent } from '../events/org.member.updated.event';
import { RpcHandler } from '@valhalla/serv.core';
import dayjs from 'dayjs';
import mongoose from 'mongoose';

export class MarkDeleteOrgMemberCommand implements ICommand {
  constructor(public readonly request: MarkDeleteMemberRequest) {}
}

@CommandHandler(MarkDeleteOrgMemberCommand)
@RpcHandler()
export class MarkDeleteOrgMemberHandler
  implements
    ICommandHandler<MarkDeleteOrgMemberCommand, MarkDeleteMemberResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly members: OrgMembersModel,
  ) {}

  private get deletingDate() {
    return dayjs().add(30, 'days').toDate();
  }

  async execute(
    command: MarkDeleteOrgMemberCommand,
  ): Promise<MarkDeleteMemberResponse> {
    const { requestedUserId, orgId, memberId } = command.request;
    const member = await this.members
      .findOne({
        user: new mongoose.Types.ObjectId(memberId),
        organization: new mongoose.Types.ObjectId(orgId),
      })
      .orFail(() => new Error('Member not found!'));

    if (member.deletingAt) {
      throw new Error('Member is already marked for deletion');
    }

    member.updatedBy = new mongoose.Types.ObjectId(requestedUserId);
    member.deletingAt = this.deletingDate;
    await member.save();

    const serialized = new OrgMemberTransformer(member).proto;
    this.eventBus.publishAll([
      new OrganizationMemberDeletingEvent(serialized),
      new OrganizationMemberUpdatedEvent(serialized),
    ]);

    return {
      member: serialized,
    };
  }
}