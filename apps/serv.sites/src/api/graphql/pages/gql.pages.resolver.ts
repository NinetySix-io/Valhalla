import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import {
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreatePageArgs } from './gql.args/create.page.args';
import { DeletePageArgs } from './gql.args/delete.page.args';
import { GetPageArgs } from './gql.args/get.page.args';
import { GetPagesBySiteArgs } from './gql.args/get.pages.by.site.args';
import { UpdatePageArgs } from './gql.args/update.page.args';
import { PageUpdatedResponse } from './gql.responses/page.updated.response';
import { Page } from './gql.types/page';

@Resolver()
export class GqlPagesResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PageUpdatedResponse)
  async createPage(
    @CurrentAccount() account: AuthAccount,
    @Args() args: CreatePageArgs,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.createPage({
        siteId: args.siteId,
        title: args.input.title,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @CurrentAccount() account: AuthAccount,
    @Args() args: DeletePageArgs,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.deletePage({
        pageId: args.pageId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @CurrentAccount() account: AuthAccount,
    @Args() args: UpdatePageArgs,
  ): Promise<PageUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updatePage({
        requestedUserId: account.id,
        pageId: args.pageId,
        title: args.input.title,
        isLoneTitle: args.input.isLoneTitle,
        description: args.input.description,
      }),
    );

    return result.data;
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async pagesBySite(@Args() args: GetPagesBySiteArgs): Promise<Page[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageList({
        siteId: args.siteId,
      }),
    );

    return result.data;
  }

  @Query(() => Page)
  @UseGuards(GqlAuthGuard)
  async page(@Args() args: GetPageArgs): Promise<Page> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPage({
        pageId: args.pageId,
      }),
    );

    return result.data;
  }
}
