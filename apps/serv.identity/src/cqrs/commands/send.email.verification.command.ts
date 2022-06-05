import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { SendEmailVerificationRequest, Verification } from '@app/protobuf';

import { EmailVerificationCreatedEvent } from '../events/email.verification.created.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationTransformer } from '@app/entities/verifications/transformer';
import { VerificationsModel } from '@app/entities/verifications';

export class SendEmailVerificationCommand implements ICommand {
  constructor(public readonly request: SendEmailVerificationRequest) {}
}

@CommandHandler(SendEmailVerificationCommand)
@RpcHandler()
export class SendEmailVerificationHandler
  implements ICommandHandler<SendEmailVerificationCommand, Verification>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(command: SendEmailVerificationCommand): Promise<Verification> {
    const email = command.request.email;
    const { verification, code } = await this.verifications.generate();
    const serialized = new VerificationTransformer(verification).proto;

    this.eventBus.publish(
      new EmailVerificationCreatedEvent({
        email,
        code,
        expiresAt: verification.expiresAt,
        owner: verification.owner?.toHexString(),
        verificationId: verification.id,
      }),
    );

    return serialized;
  }
}
