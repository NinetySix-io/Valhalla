import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schemas';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Page } from '@app/protobuf';
import { UseGuards } from '@nestjs/common';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  EmptyObjectValidation,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreatePageInput } from './inputs/create.page.input';
import { UpdatePageInput } from './inputs/update.page.input';
import { PageUpdatedResponse } from './responses/page.updated.response';

@Resolver()
export class GqlPagesResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PageUpdatedResponse)
  async createPage(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() organizationId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
    @Args('input') input: CreatePageInput,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.createPage({
        siteId,
        requestedUserId: account.id,
        ownerId: organizationId,
        title: input.title,
      }),
    );

    return {
      id: result.data.id,
      status: result.data.status,
    };
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @CurrentAccount() account: AuthAccount,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.deletePage({
        pageId,
        requestedUserId: account.id,
      }),
    );

    return {
      id: result.data.id,
      status: result.data.status,
    };
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @CurrentAccount() account: AuthAccount,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdatePageInput,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updatePage({
        requestedUserId: account.id,
        pageId,
        isLoneTitle: input.isLoneTitle,
        title: input.title,
        description: input.description,
      }),
    );

    return {
      id: result.data.id,
      status: result.data.status,
    };
  }

  @Query(() => [PageSchema])
  @UseGuards(GqlAuthGuard)
  async pageList(
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<Page[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageList({
        siteId,
      }),
    );

    return result.data;
  }

  @Query(() => PageSchema)
  @UseGuards(GqlAuthGuard)
  async page(
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
  ): Promise<Page> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPage({
        pageId,
      }),
    );

    return result.data;
  }
}
