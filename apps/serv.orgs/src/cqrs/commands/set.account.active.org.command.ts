import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';
import {
  SetAccountActiveOrgRequest,
  SetAccountActiveOrgResponse,
} from '@app/protobuf';

import { AccountSettingsModel } from '@app/entities/account.settings';
import { AccountSettingsUpdatedEvent } from '../events/account.settings.updated.event';

export class SetAccountActiveOrgCommand implements ICommand {
  constructor(public readonly request: SetAccountActiveOrgRequest) {}
}

@CommandHandler(SetAccountActiveOrgCommand)
@RpcHandler()
export class SetAccountActiveOrgHandler
  implements
    ICommandHandler<SetAccountActiveOrgCommand, SetAccountActiveOrgResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly accountSettings: AccountSettingsModel,
  ) {}

  async execute(
    command: SetAccountActiveOrgCommand,
  ): Promise<SetAccountActiveOrgResponse> {
    const accountId = toObjectId(command.request.accountId);
    const orgId = toObjectId(command.request.organizationId);
    await this.accountSettings.updateOne(
      { account: accountId },
      { $set: { activeOrg: orgId } },
      { upsert: true },
    );

    this.eventBus.publish(
      new AccountSettingsUpdatedEvent(command.request.accountId, {
        name: 'activeOrg',
        value: command.request.organizationId,
      }),
    );

    return {
      success: true,
    };
  }
}
