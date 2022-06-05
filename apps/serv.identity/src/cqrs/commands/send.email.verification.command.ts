import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
} from '@app/protobuf';

import { EmailVerificationSentEvent } from '../events/email.verification.sent.event';
import { RpcHandler } from '@valhalla/serv.core';
import { VerificationCreatedEvent } from '../events/verification.created.event';
import { VerificationTransformer } from '@app/entities/verifications/transformer';
import { VerificationsModel } from '@app/entities/verifications';
import mongoose from 'mongoose';

export class SendEmailVerificationCommand implements ICommand {
  constructor(public readonly request: SendEmailVerificationRequest) {}
}

@CommandHandler(SendEmailVerificationCommand)
@RpcHandler()
export class SendEmailVerificationHandler
  implements
    ICommandHandler<
      SendEmailVerificationCommand,
      SendEmailVerificationResponse
    >
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(
    command: SendEmailVerificationCommand,
  ): Promise<SendEmailVerificationResponse> {
    const accountId = new mongoose.Types.ObjectId(command.request.accountId);
    const verification = await this.verifications.generate(accountId);

    const serialized = new VerificationTransformer(verification).proto;

    this.eventBus.publishAll([
      new EmailVerificationSentEvent(verification.id),
      new VerificationCreatedEvent(verification.id),
    ]);

    return {
      verification: serialized,
    };
  }
}
