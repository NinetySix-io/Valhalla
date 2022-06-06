import { gRpcController } from '@app/grpc/grpc.controller';
import { Query } from '@nestjs/graphql';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import {
  EmailParamValidation,
  EmptyStringValidation,
  ParamValidationPipe,
  PhoneParamValidation,
  resolveRpcRequest,
} from '@valhalla/serv.core';

@Resolver()
export class GqlVerificationResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => String, {
    description: 'Send verification code to email',
  })
  async sendEmailVerificationCode(
    @Args('email', new ParamValidationPipe([EmailParamValidation]))
    email: string,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.sendEmailVerification({
        email,
      }),
    );

    return result.id;
  }

  @Mutation(() => String, {
    description: 'Send verification code to phone number',
  })
  async sendPhoneVerificationCode(
    @Args('phone', new ParamValidationPipe([PhoneParamValidation]))
    phone: string,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.sendPhoneVerification({
        phone,
      }),
    );

    return result.id;
  }

  @Query(() => Boolean, {
    description: 'Validate verification code',
  })
  async validateVerificationCode(
    @Args('verificationId', new ParamValidationPipe([EmptyStringValidation]))
    verificationId: string,
    @Args('verificationCode', new ParamValidationPipe([EmptyStringValidation]))
    verificationCode: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.validateVerification({
        verificationCode,
        verificationId,
      }),
    );

    return result.isValid;
  }
}
