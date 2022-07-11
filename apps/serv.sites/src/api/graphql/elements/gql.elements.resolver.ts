import { ElementSchema } from '@app/entities/elements/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Element } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateElementInput } from './inputs/create.element.input';
import { DeleteElementInput } from './inputs/delete.element.input';
import { PageContextInput } from './inputs/page.ctx.input';
import { UpdateElementInput } from './inputs/update.element.input';
import { HierarchicalElementResponse } from './responses/hierarchical.element.list.response';

@Resolver()
export class GqlElementsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async createElement(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: CreateElementInput,
  ): Promise<string> {
    const result = await resolveRpcRequest(
      this.rpcClient.createElement({
        owners: [orgId, input.siteId, input.pageId],
        requestedUserId: account.id,
        type: input.type,
        parent: input.parent,
        isRoot: input.isRoot,
        props: input.props,
      }),
    );

    return result.element.id;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateElement(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    elementId: string,
    @Args('input') input: UpdateElementInput,
  ) {
    await resolveRpcRequest(
      this.rpcClient.updateElement({
        elementId,
        owners: [orgId, input.siteId, input.pageId],
        requestedUserId: account.id,
        type: input.type,
        parent: input.parent,
        props: input.props,
      }),
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteElement(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    elementId: string,
    @Args('input') input: DeleteElementInput,
  ) {
    await resolveRpcRequest(
      this.rpcClient.deleteElement({
        elementId,
        owners: [orgId, input.siteId, input.pageId],
        requestedUserId: account.id,
      }),
    );

    return true;
  }

  @Query(() => [ElementSchema])
  @UseGuards(GqlAuthGuard)
  async flatElementList(
    @AccountActiveOrg() orgId: string,
    @Args('filter') filter: PageContextInput,
  ): Promise<Element[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getElementFlatList({
        owners: [orgId, filter.siteId, filter.pageId],
      }),
    );

    return result.elements;
  }

  @Query(() => [HierarchicalElementResponse])
  @UseGuards(GqlAuthGuard)
  async hierarchicalElementList(
    @AccountActiveOrg() orgId: string,
    @Args('filter') filter: PageContextInput,
  ): Promise<HierarchicalElementResponse[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getElementHierarchicalList({
        owners: [orgId, filter.siteId, filter.pageId],
      }),
    );

    return result.elements;
  }
}
