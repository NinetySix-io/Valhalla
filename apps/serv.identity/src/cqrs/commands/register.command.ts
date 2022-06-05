import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreatePayload, RpcHandler } from '@valhalla/serv.core';
import { RegisterRequest, RegisterResponse, Verification } from '@app/protobuf';

import { AccountRegisteredEvent } from '../events/account.registered.event';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountTransformer } from '@app/entities/accounts/transformer';
import { AccountsModel } from '@app/entities/accounts';
import { SendEmailVerificationCommand } from './send.email.verification.command';
import { SendPhoneVerificationCommand } from './send.phone.verification.command';
import mongoose from 'mongoose';

export class RegisterCommand implements ICommand {
  constructor(public readonly request: RegisterRequest) {}
}

@CommandHandler(RegisterCommand)
@RpcHandler()
export class RegisterHandler
  implements ICommandHandler<RegisterCommand, RegisterResponse>
{
  constructor(
    private readonly accounts: AccountsModel,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}

  private async validateEmail(email: string) {
    const isTaken = await this.accounts.isEmailTaken(email);
    if (isTaken) {
      throw new Error('This email address is taken!');
    }
  }

  private async validatePhone(phone: string) {
    const isTaken = await this.accounts.isPhoneTaken(phone);
    if (isTaken) {
      throw new Error('This phone number is taken!');
    }
  }

  private async buildPhoneRecord(
    phone: string,
  ): Promise<CreatePayload<AccountSchema>['phones']> {
    const verification: Verification = await this.commandBus.execute(
      new SendPhoneVerificationCommand({
        phone,
      }),
    );

    return [
      {
        value: phone,
        isVerified: false,
        isPrimary: true,
        verification: new mongoose.Types.ObjectId(verification.id),
      },
    ];
  }

  private async buildEmailRecord(
    email: string,
  ): Promise<CreatePayload<AccountSchema>['emails']> {
    const verification: Verification = await this.commandBus.execute(
      new SendEmailVerificationCommand({
        email,
      }),
    );

    return [
      {
        value: email,
        isVerified: false,
        isPrimary: true,
        verification: new mongoose.Types.ObjectId(verification.id),
      },
    ];
  }

  async execute(command: RegisterCommand): Promise<RegisterResponse> {
    const { email, phone, firstName, lastName, displayName } = command.request;

    await Promise.all([
      this.validateEmail(email),
      phone ? this.validatePhone(phone) : true,
    ]);

    const [emails, phones] = await Promise.all([
      this.buildEmailRecord(email),
      phone ? this.buildPhoneRecord(phone) : [],
    ]);

    const account = await this.accounts.create({
      displayName: displayName || firstName || email,
      firstName,
      lastName,
      emails,
      phones,
    });

    const accountProto = new AccountTransformer(account).proto;
    const event = new AccountRegisteredEvent(accountProto, 'local');

    account.save();
    this.eventBus.publish(event);

    return {
      account: accountProto,
    };
  }
}
