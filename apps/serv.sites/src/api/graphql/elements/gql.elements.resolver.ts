import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  EmptyObjectValidation,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';

import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import { isObjectIdOrHexString } from 'mongoose';
import { AddTextElementInput } from './inputs/add.text.element.input';
import { ElementUnion } from './inputs/element.union';
import { UpdateTextElementInput } from './inputs/update.text.element.input';
import { PageElementTextSchema } from '@app/entities/page.elements/variants/text.variant';

@Resolver()
export class GqlElementsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Query(() => [ElementUnion])
  @UseGuards(GqlAuthGuard)
  async pageElementListByGroup(
    @Args('groupId', new ParamValidationPipe([ObjectIdParamValidation]))
    groupId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageElementListByGroup({
        groupId,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageElementTextSchema, { description: 'Add text element' })
  @UseGuards(GqlAuthGuard)
  async addTextElement(
    @CurrentAccount() account: AuthAccount,
    @Args('groupId', new ParamValidationPipe([ObjectIdParamValidation]))
    groupId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: AddTextElementInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.addPageElement({
        groupId,
        requestedUserId: account.id,
        desktop: input.desktop,
        tablet: input.tablet,
        mobile: input.mobile,
        type: {
          $case: 'text',
          text: {
            html: input.html,
            json: input.json,
          },
        },
      }),
    );
    return result.data;
  }

  @Mutation(() => PageElementTextSchema, { description: 'Update text element' })
  @UseGuards(GqlAuthGuard)
  async updateTextElement(
    @CurrentAccount() account: AuthAccount,
    @Args('elementId', new ParamValidationPipe([ObjectIdParamValidation]))
    elementId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdateTextElementInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updatePageElement({
        elementId,
        desktop: input.desktop,
        mobile: input.mobile,
        tablet: input.tablet,
        requestedUserId: account.id,
        type: {
          $case: 'text',
          text: {
            html: input.html,
            json: input.json,
          },
        },
      }),
    );
    return result.data;
  }

  @Mutation(() => [ElementUnion])
  @UseGuards(GqlAuthGuard)
  async deleteManyElements(
    @CurrentAccount() account: AuthAccount,
    @Args(
      { name: 'elementIdList', type: () => [String] },
      new ParamValidationPipe([
        {
          validate(value) {
            return (
              Array.isArray(value) &&
              value.every((entry) => isObjectIdOrHexString(entry))
            );
          },
        },
      ]),
    )
    elementIdList: string[],
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteManyPageElements({
        requestedUserId: account.id,
        elementIdList,
      }),
    );

    return result.data;
  }
}
