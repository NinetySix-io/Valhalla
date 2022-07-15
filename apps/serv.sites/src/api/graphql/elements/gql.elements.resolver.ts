import { ElementUnion } from '@app/entities/elements';
import { gRpcController } from '@app/grpc/grpc.controller';
import { ElementType } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateBoxInput } from './inputs/create.box.input';
import { CreateTextInput } from './inputs/create.text.input';
import { PageContextInput } from './inputs/ctx.input';
import { DeleteElementInput } from './inputs/delete.element.input';
import { UpdateBoxInput } from './inputs/update.box.input';
import { UpdateTextInput } from './inputs/update.text.input';

@Resolver()
export class GqlElementsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteElement(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: DeleteElementInput,
  ) {
    await resolveRpcRequest(
      this.rpcClient.deleteElement({
        owners: [orgId, input.ctx.siteId, input.ctx.pageId],
        requestedUserId: account.id,
        elementId: input.elementId,
      }),
    );

    return true;
  }

  @Query(() => [ElementUnion])
  @UseGuards(GqlAuthGuard)
  async flatElementList(
    @AccountActiveOrg() orgId: string,
    @Args('filter') filter: PageContextInput,
  ): Promise<Array<typeof ElementUnion>> {
    const result = await resolveRpcRequest(
      this.rpcClient.getElementFlatList({
        owners: [orgId, filter.siteId, filter.pageId],
      }),
    );

    const serialized = result.elements.map(({ element }) => {
      const parent = element as unknown as Record<
        typeof element['$case'],
        typeof ElementUnion
      >;
      const type = element.$case as ElementType;
      parent[type].type = type;
      return parent[type];
    });

    return serialized;
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async createBox(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: CreateBoxInput,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.createBox({
        owners: [orgId, input.ctx.siteId, input.ctx.pageId],
        requestedUserId: account.id,
        style: input.style,
        parent: input.parent,
        htmlType: input.htmlType,
      }),
    );

    return result.elementId;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateBox(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: UpdateBoxInput,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.updateBox({
        owners: [orgId, input.ctx.siteId, input.ctx.pageId],
        requestedUserId: account.id,
        style: input.style,
        elementId: input.elementId,
        htmlType: input.htmlType,
      }),
    );

    return true;
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async createText(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: CreateTextInput,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.createText({
        owners: [orgId, input.ctx.siteId, input.ctx.pageId],
        requestedUserId: account.id,
        text: input.text,
        style: input.style,
        parent: input.parent,
      }),
    );

    return result.elementId;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateText(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: UpdateTextInput,
  ): Promise<boolean> {
    await resolveRpcRequest(
      this.rpcClient.updateText({
        owners: [orgId, input.ctx.siteId, input.ctx.pageId],
        elementId: input.elementId,
        text: input.text,
        style: input.style,
        requestedUserId: account.id,
      }),
    );

    return true;
  }
}
