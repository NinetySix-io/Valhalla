import {
  Account,
  AddEmailToAccountRequest,
  Verification,
  VerificationChannel,
} from '@app/protobuf';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { EmailAddedToAccountEvent } from '../events/email.added.to.account.event';
import { SendVerificationCodeCommand } from './send.verification.code.command';

export class AddEmailToAccountCommand implements ICommand {
  constructor(public readonly request: AddEmailToAccountRequest) {}
}

@CommandHandler(AddEmailToAccountCommand)
@RpcHandler()
export class AddEmailToAccountHandler
  implements ICommandHandler<AddEmailToAccountCommand, Account>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly accounts: AccountsModel,
  ) {}

  async execute(command: AddEmailToAccountCommand): Promise<Account> {
    const isTaken = await this.accounts.isEmailTaken(command.request.email);
    if (isTaken) {
      throw new Error('This phone number is associated with another account!');
    }

    const account = await this.accounts
      .findById(command.request.accountId)
      .orFail();

    const primaryEmail = account.emails.find((email) => email.isPrimary);
    if (!primaryEmail?.isVerified) {
      throw new Error('Primary email address is not verified!');
    }

    let isAdded = false;
    const isAlreadyAdded = account.emails.find(
      (email) => email.value === command.request.email,
    );

    if (!isAlreadyAdded) {
      const verification: Verification = await this.commandBus.execute(
        new SendVerificationCodeCommand({
          channel: VerificationChannel.EMAIL,
          destination: command.request.email,
        }),
      );

      account.emails.push({
        value: command.request.email,
        isVerified: false,
        isPrimary: false,
        verification: toObjectId(verification.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await account.save();
      isAdded = true;
    }

    const serialized = new AccountTransformer(account).proto;

    if (isAdded) {
      this.eventBus.publish(
        new EmailAddedToAccountEvent(command.request.email, serialized),
      );
    }

    return serialized;
  }
}
