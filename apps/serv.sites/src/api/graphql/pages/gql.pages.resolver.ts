import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PageSchema } from '@app/entities/pages/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Page } from '@app/protobuf';
import { NotFoundException, UseGuards } from '@nestjs/common';
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
import { PageUpdatedResponse } from './responses/page.updated.response';
import { UpdatePageInput } from './inputs/update.page.input';

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
        requestedUserId: account.id,
        organizationId,
        siteId,
        title: input.title,
      }),
    );

    return {
      id: result.page.id,
      status: result.page.status,
    };
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() organizationId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.deletePage({
        pageId,
        siteId,
        organizationId,
        requestedUserId: account.id,
      }),
    );

    if (!result.page) {
      throw new NotFoundException();
    }

    return {
      id: result.page.id,
      status: result.page.status,
    };
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() organizationId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdatePageInput,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updatePage({
        requestedUserId: account.id,
        organizationId,
        siteId,
        pageId,
        isLoneTitle: input.isLoneTitle,
        title: input.title,
        description: input.description,
      }),
    );

    if (!result.page) {
      throw new NotFoundException();
    }

    return {
      id: result.page.id,
      status: result.page.status,
    };
  }

  @Query(() => [PageSchema])
  @UseGuards(GqlAuthGuard)
  async getPageList(
    @AccountActiveOrg() organizationId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<Page[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageList({
        organizationId,
        siteId,
      }),
    );

    return result.pageList;
  }

  @Query(() => PageSchema)
  @UseGuards(GqlAuthGuard)
  async getPage(
    @AccountActiveOrg() organizationId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
  ): Promise<Page> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPage({
        pageId,
        siteId,
        organizationId,
      }),
    );

    if (!result.page) {
      throw new NotFoundException();
    }

    return result.page;
  }
}
