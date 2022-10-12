import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateSectionArgs } from './gql.args/create.section.args';
import { GetSectionArgs } from './gql.args/get.section.args';
import { GetSectionsByPageArgs } from './gql.args/get.sections.by.page.args';
import { SectionMetaArgs } from './gql.args/section.meta.args';
import { UpdateSectionFormatArgs } from './gql.args/update.section.format.args';
import { UpdateSectionIndexArgs } from './gql.args/update.section.index.args';
import { PageSection } from './gql.types/page.section';

@Resolver()
export class GqlSectionsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Query(() => [PageSection])
  @UseGuards(GqlAuthGuard)
  async sectionsByPage(
    @Args() args: GetSectionsByPageArgs,
  ): Promise<PageSection[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageSectionList({
        pageId: args.pageId,
      }),
    );

    return result.data;
  }

  @Query(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async section(@Args() args: GetSectionArgs): Promise<PageSection> {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageSection({
        sectionId: args.sectionId,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async createSection(
    @CurrentAccount() account: AuthAccount,
    @Args() args: CreateSectionArgs,
  ): Promise<PageSection> {
    const result = await resolveRpcRequest(
      this.rpcClient.createSection({
        index: args.input.index,
        pageId: args.pageId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async updateSectionFormat(
    @CurrentAccount() account: AuthAccount,
    @Args() args: UpdateSectionFormatArgs,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionFormat({
        pageId: args.pageId,
        sectionId: args.sectionId,
        requestedUserId: account.id,
        columnGap: args.input.columnGap,
        rowGap: args.input.rowGap,
        rowsCount: args.input.rowGap,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async updateSectionIndex(
    @CurrentAccount() account: AuthAccount,
    @Args() args: UpdateSectionIndexArgs,
  ): Promise<PageSection> {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionIndex({
        index: args.index,
        pageId: args.pageId,
        sectionId: args.sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async deleteSection(
    @CurrentAccount() account: AuthAccount,
    @Args() args: SectionMetaArgs,
  ): Promise<PageSection> {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteSection({
        pageId: args.pageId,
        sectionId: args.sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSection)
  @UseGuards(GqlAuthGuard)
  async cloneSection(
    @CurrentAccount() account: AuthAccount,
    @Args() args: SectionMetaArgs,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.cloneSection({
        pageId: args.pageId,
        sectionId: args.sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }
}
