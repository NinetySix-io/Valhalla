import { gRpcController } from '@app/grpc/grpc.controller';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { resolveRpcRequest } from '@valhalla/serv.core';
import { SendVerificationCodeArgs } from './gql.args/send.verification.code.args';
import { ValidateVerificationCodeArgs } from './gql.args/validator.verification.code.args';

@Resolver()
export class GqlVerificationResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => String, {
    description: 'Send verification code to email',
  })
  async sendVerificationCode(
    @Args() args: SendVerificationCodeArgs,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.sendVerificationCode(args),
    );

    return result.id;
  }

  @Query(() => Boolean, {
    description: 'Validate verification code',
  })
  async validateVerificationCode(
    @Args() args: ValidateVerificationCodeArgs,
  ): Promise<boolean> {
    const result = await resolveRpcRequest(
      this.rpcClient.validateVerification(args),
    );

    return result.isValid;
  }
}
