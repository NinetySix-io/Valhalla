import { SiteSchema } from '@app/entities/sites/schema';
import { gRpcController } from '@app/grpc/grpc.controller';
import { Site } from '@app/protobuf';
import {
  NotFoundException,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { CreateSiteInput } from './inputs/create.site.input';
import { UpdateSiteInput } from './inputs/update.site.input';
import { SiteUpdatedResponse } from './responses/site.updated.response';

@Resolver()
export class GqlSitesResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => SiteUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async createSite(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: CreateSiteInput,
  ): Promise<SiteUpdatedResponse> {
    const result = await resolveRpcRequest(
      await this.rpcClient.createSite({
        name: input.name,
        owner: orgId,
        requestedUserId: account.id,
      }),
    );

    return {
      id: result.siteId,
      status: result.status,
    };
  }

  @Mutation(() => SiteUpdatedResponse)
  @UseGuards(GqlAuthGuard)
  async updateSite(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdateSiteInput,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<SiteUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSite({
        name: input.name,
        requestedUserId: account.id,
        siteId: siteId,
        organizationId: orgId,
      }),
    );

    if (!result.site) {
      throw new InternalServerErrorException();
    }

    return {
      id: result.site.id,
      status: result.site.status,
    };
  }

  @Query(() => [SiteSchema])
  @UseGuards(GqlAuthGuard)
  async getSiteList(@AccountActiveOrg() orgId: string): Promise<Site[]> {
    const { sites } = await resolveRpcRequest(
      this.rpcClient.getSiteList({
        query: {
          $case: 'ownBy',
          ownBy: orgId,
        },
      }),
    );

    return sites;
  }

  @Query(() => SiteSchema)
  @UseGuards(GqlAuthGuard)
  async getSite(
    @AccountActiveOrg() orgId: string,
    @Args('siteId', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<Site> {
    const { site } = await resolveRpcRequest(
      this.rpcClient.getSite({
        orgId,
        siteId,
      }),
    );

    if (!site) {
      throw new NotFoundException('Site not found!');
    }

    return site;
  }
}
