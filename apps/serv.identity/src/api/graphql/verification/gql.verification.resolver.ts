import { gRpcController } from '@app/grpc/grpc.controller';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import {
  EmailParamValidation,
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
}
