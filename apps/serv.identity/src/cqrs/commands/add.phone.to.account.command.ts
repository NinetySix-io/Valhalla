import {
  Account,
  AddPhoneToAccountRequest,
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
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { AccountProto } from '../protos/account.proto';
import { AccountsModel } from '@app/entities/accounts';
import { PhoneAddedToAccountEvent } from '../events/phone.added.to.account.event';
import { SendVerificationCodeCommand } from './send.verification.code.command';
import mongoose from 'mongoose';

export class AddPhoneToAccountCommand implements ICommand {
  constructor(public readonly request: AddPhoneToAccountRequest) {}
}

@CommandHandler(AddPhoneToAccountCommand)
@RpcHandler()
export class AddPhoneToAccountHandler
  implements ICommandHandler<AddPhoneToAccountCommand, Account>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly accounts: AccountsModel,
  ) {}

  async execute(command: AddPhoneToAccountCommand): Promise<Account> {
    const isTaken = await this.accounts.isPhoneTaken(command.request.phone);
    if (isTaken) {
      throw new Error('This phone number is associated with another account!');
    }

    const account = await this.accounts
      .findById(command.request.accountId)
      .orFail();

    const primaryPhone = account.phones.find((phone) => phone.isPrimary);
    if (!primaryPhone?.isVerified) {
      throw new Error('Primary phone number is not verified!');
    }

    let isAdded = false;
    const isAlreadyAdded = account.phones.find(
      (phone) => phone.value === command.request.phone,
    );

    if (!isAlreadyAdded) {
      const verification: Verification = await this.commandBus.execute(
        new SendVerificationCodeCommand({
          channel: VerificationChannel.SMS,
          destination: command.request.phone,
        }),
      );

      account.phones.push({
        _id: new mongoose.Types.ObjectId(),
        value: command.request.phone,
        isVerified: false,
        isPrimary: false,
        verification: toObjectId(verification.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await account.save();
      isAdded = true;
    }

    const serialized = Serializer.from(AccountProto).serialize(account);

    if (isAdded) {
      this.eventBus.publish(
        new PhoneAddedToAccountEvent(command.request.phone, serialized),
      );
    }

    return serialized;
  }
}
