import { gRpcController } from '@app/grpc/grpc.controller';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { resolveRpcRequest } from '@valhalla/serv.core';
import { SendVerificationCodeInput } from './inputs/send.verification.code.input';
import { ValidateVerificationCodeInput } from './inputs/validator.verification.code.input';

@Resolver()
export class GqlVerificationResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => String, {
    description: 'Send verification code to email',
  })
  async sendVerificationCode(
    @Args('input') input: SendVerificationCodeInput,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.sendVerificationCode(input),
    );

    return result.id;
  }

  @Query(() => Boolean, {
    description: 'Validate verification code',
  })
  async validateVerificationCode(
    @Args('input') input: ValidateVerificationCodeInput,
  ): Promise<boolean> {
    const result = await resolveRpcRequest(
      this.rpcClient.validateVerification(input),
    );

    return result.isValid;
  }
}
