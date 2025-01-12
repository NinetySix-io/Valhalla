import {
  Account,
  CreateAccessResponse,
  RegisterRequest,
  RegisterResponse,
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
import {
  CreatePayload,
  RpcHandler,
  Serializer,
  toObjectId,
} from '@valhalla/serv.core';

import { AccountProto } from '../protos/account.proto';
import { AccountRegisteredEvent } from '../events/account.registered.event';
import { AccountSchema } from '@app/entities/accounts/schema';
import { AccountsModel } from '@app/entities/accounts';
import { CreateAccessCommand } from './create.access.command';
import { SendVerificationCodeCommand } from './send.verification.code.command';

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
      new SendVerificationCodeCommand({
        channel: VerificationChannel.SMS,
        destination: phone,
      }),
    );

    return [
      {
        value: phone,
        isVerified: false,
        isPrimary: true,
        verification: toObjectId(verification.id),
      },
    ];
  }

  private async buildEmailRecord(
    email: string,
  ): Promise<CreatePayload<AccountSchema>['emails']> {
    const verification: Verification = await this.commandBus.execute(
      new SendVerificationCodeCommand({
        channel: VerificationChannel.EMAIL,
        destination: email,
      }),
    );

    return [
      {
        value: email,
        isVerified: false,
        isPrimary: true,
        verification: toObjectId(verification.id),
      },
    ];
  }

  private makeToken(account: Account): Promise<CreateAccessResponse> {
    return this.commandBus.execute(new CreateAccessCommand(account));
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

    const accountProto = Serializer.from(AccountProto).serialize(account);
    const event = new AccountRegisteredEvent(accountProto, 'local');
    const tokens = await this.makeToken(accountProto);

    account.save();
    this.eventBus.publish(event);

    return {
      account: accountProto,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
