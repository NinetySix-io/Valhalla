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
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { OrgMemberProto } from '../protos/org.member.proto';
import { OrgMembersModel } from '@app/entities/org.members';
import { OrganizationMemberDeletingEvent } from '../events/org.member.deleting.event';
import { OrganizationMemberUpdatedEvent } from '../events/org.member.updated.event';
import dayjs from 'dayjs';

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
    const updatedBy = toObjectId(command.request.requestedUserId);
    const memberId = toObjectId(command.request.memberId);
    const organization = toObjectId(command.request.orgId);
    const member = await this.members
      .findOneAndUpdate(
        { _id: memberId, organization, deletingAt: { $exists: false } },
        { $set: { deletingAt: this.deletingDate, updatedBy } },
        { new: true },
      )
      .lean()
      .orFail();

    const serialized = Serializer.from(OrgMemberProto).serialize(member);
    this.eventBus.publishAll([
      new OrganizationMemberDeletingEvent(serialized),
      new OrganizationMemberUpdatedEvent(serialized),
    ]);

    return {
      member: serialized,
    };
  }
}
