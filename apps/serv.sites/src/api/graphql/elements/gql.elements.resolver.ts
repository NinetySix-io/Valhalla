import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
  Serializer,
} from '@valhalla/serv.core';

import { gRpcController } from '@app/grpc/grpc.controller';
import { PageElement } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { AddTextElementArgs } from './gql.args/add.text.element.args';
import { DeleteManyElementsArgs } from './gql.args/delete.many.elements.args';
import { GetElementByGroupArgs } from './gql.args/get.element.by.group.args';
import { UpdateTextElementArgs } from './gql.args/update.text.element.args';
import { ElementText } from './gql.types/element.text';
import { ElementUnion } from './gql.types/element.union';

@Resolver()
export class GqlElementsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  private resolveSchema(data: PageElement) {
    if (data.type.$case === 'text') {
      return Serializer.from(ElementText).serialize(data);
    }
  }

  private resolveSchemas(data: PageElement[]) {
    return data.map((item) => this.resolveSchema(item));
  }

  @Query(() => [ElementUnion])
  @UseGuards(GqlAuthGuard)
  async elementsByGroup(
    @Args() args: GetElementByGroupArgs,
  ): Promise<typeof ElementUnion[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageElementListByGroup({
        groupId: args.groupId,
      }),
    );

    return this.resolveSchemas(result.data);
  }

  @Mutation(() => ElementText, { description: 'Add text element' })
  @UseGuards(GqlAuthGuard)
  async addTextElement(
    @CurrentAccount() account: AuthAccount,
    @Args() args: AddTextElementArgs,
  ): Promise<ElementText> {
    const result = await resolveRpcRequest(
      this.rpcClient.addPageElement({
        groupId: args.groupId,
        requestedUserId: account.id,
        desktop: args.desktop,
        tablet: args.tablet,
        mobile: args.mobile,
        type: {
          $case: 'text',
          text: {
            html: args.html,
            json: args.json,
          },
        },
      }),
    );

    return this.resolveSchema(result.data);
  }

  @Mutation(() => ElementText, { description: 'Update text element' })
  @UseGuards(GqlAuthGuard)
  async updateTextElement(
    @CurrentAccount() account: AuthAccount,
    @Args() args: UpdateTextElementArgs,
  ): Promise<ElementText> {
    const result = await resolveRpcRequest(
      this.rpcClient.updatePageElement({
        elementId: args.elementId,
        desktop: args.desktop,
        mobile: args.mobile,
        tablet: args.tablet,
        requestedUserId: account.id,
        type: {
          $case: 'text',
          text: {
            html: args.html,
            json: args.json,
          },
        },
      }),
    );

    return this.resolveSchema(result.data);
  }

  @Mutation(() => [ElementUnion])
  @UseGuards(GqlAuthGuard)
  async deleteManyElements(
    @CurrentAccount() account: AuthAccount,
    @Args() args: DeleteManyElementsArgs,
  ): Promise<typeof ElementUnion[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteManyPageElements({
        requestedUserId: account.id,
        elementIdList: args.elementIds,
      }),
    );

    return this.resolveSchemas(result.data);
  }
}
