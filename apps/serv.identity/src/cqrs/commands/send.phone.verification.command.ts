import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { SendPhoneVerificationRequest, Verification } from '@app/protobuf';

import { PhoneVerificationCreatedEvent } from '../events/phone.verification.created.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationTransformer } from '@app/entities/verifications/transformer';
import { VerificationsModel } from '@app/entities/verifications';

export class SendPhoneVerificationCommand implements ICommand {
  constructor(public readonly request: SendPhoneVerificationRequest) {}
}

@CommandHandler(SendPhoneVerificationCommand)
@RpcHandler()
export class SendPhoneVerificationHandler
  implements ICommandHandler<SendPhoneVerificationCommand, Verification>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(command: SendPhoneVerificationCommand): Promise<Verification> {
    const phone = command.request.phone;
    const { verification, code } = await this.verifications.generate();
    const serialized = new VerificationTransformer(verification).proto;

    this.eventBus.publish(
      new PhoneVerificationCreatedEvent({
        phone,
        code,
        verificationId: verification.id,
        expiresAt: verification.expiresAt,
      }),
    );

    return serialized;
  }
}
