import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateSiteArgs } from './gql.args/create.site.args';
import { GetSiteArgs } from './gql.args/get.site.args';
import { UpdateSiteArgs } from './gql.args/update.site.input';
import { SiteUpdatedResponse } from './gql.responses/site.updated.response';
import { Site } from './gql.types/site';

@Resolver()
export class GqlSitesResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => SiteUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async createSite(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args() args: CreateSiteArgs,
  ): Promise<SiteUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.createSite({
        name: args.input.name,
        ownerId: orgId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => SiteUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async updateSite(
    @CurrentAccount() account: AuthAccount,
    @Args() args: UpdateSiteArgs,
  ): Promise<SiteUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSite({
        name: args.input.name,
        siteId: args.siteId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Query(() => [Site])
  @UseGuards(GqlAuthGuard)
  async siteByOwner(@AccountActiveOrg() orgId: string): Promise<Site[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getSiteList({
        ownerId: orgId,
      }),
    );

    return result.data;
  }

  @Query(() => Site)
  @UseGuards(GqlAuthGuard)
  async site(@Args() args: GetSiteArgs): Promise<Site> {
    const result = await resolveRpcRequest(
      this.rpcClient.getSite({
        siteId: args.siteId,
      }),
    );

    return result.data;
  }
}
