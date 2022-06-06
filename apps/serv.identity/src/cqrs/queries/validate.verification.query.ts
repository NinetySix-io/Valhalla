import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ValidateVerificationRequest,
  ValidateVerificationResponse,
} from '@app/protobuf';

import { VerificationsModel } from '@app/entities/verifications';

export class ValidateVerificationQuery implements IQuery {
  constructor(public readonly request: ValidateVerificationRequest) {}
}

@QueryHandler(ValidateVerificationQuery)
export class ValidateVerificationHandler
  implements
    IQueryHandler<ValidateVerificationQuery, ValidateVerificationResponse>
{
  constructor(private readonly verifications: VerificationsModel) {}

  async execute(
    command: ValidateVerificationQuery,
  ): Promise<ValidateVerificationResponse> {
    const { verificationCode, verificationId } = command.request;
    const verification = await this.verifications.findById(verificationId);
    if (!verification) {
      return {
        isValid: false,
      };
    }

    const isValid = await this.verifications.validateCode(
      verificationCode,
      verification.hashed,
    );

    return {
      isValid,
    };
  }
}
