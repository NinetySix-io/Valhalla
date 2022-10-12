import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';
import { SendVerificationCodeRequest, Verification } from '@app/protobuf';

import { VerificationCodeSentEvent } from '../events/verification.code.sent.event';
import { VerificationCreatedEvent } from '../events/verification.created.event';
import { VerificationProto } from '../protos/verification.proto';
import { VerificationsModel } from '@app/entities/verifications';

export class SendVerificationCodeCommand implements ICommand {
  constructor(public readonly request: SendVerificationCodeRequest) {}
}

@CommandHandler(SendVerificationCodeCommand)
@RpcHandler()
export class SendVerificationCodeHandler
  implements ICommandHandler<SendVerificationCodeCommand, Verification>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly verifications: VerificationsModel,
  ) {}

  async execute(command: SendVerificationCodeCommand): Promise<Verification> {
    const { destination, channel } = command.request;
    const { verification, code } = await this.verifications.generate();
    const serialized =
      Serializer.from(VerificationProto).serialize(verification);

    this.eventBus.publishAll([
      new VerificationCreatedEvent({
        code,
        channel,
        destination,
        expiresAt: verification.expiresAt,
        owner: verification.owner?.toString(),
        verificationId: verification.id,
      }),

      //TODO: sending impl
      new VerificationCodeSentEvent({
        verificationId: verification.id,
        channel,
      }),
    ]);

    return serialized;
  }
}
