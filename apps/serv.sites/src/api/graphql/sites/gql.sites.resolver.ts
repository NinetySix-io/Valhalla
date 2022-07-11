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
      this.rpcClient.createSite({
        name: input.name,
        ownerId: orgId,
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
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<SiteUpdatedResponse> {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSite({
        name: input.name,
        requestedUserId: account.id,
        siteId: siteId,
        ownerId: orgId,
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
  async siteList(@AccountActiveOrg() orgId: string): Promise<Site[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getSiteList({
        query: {
          $case: 'ownerId',
          ownerId: orgId,
        },
      }),
    );

    return result.sites;
  }

  @Query(() => SiteSchema)
  @UseGuards(GqlAuthGuard)
  async site(
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    siteId: string,
  ): Promise<Site> {
    const result = await resolveRpcRequest(
      this.rpcClient.getSite({
        ownerId: orgId,
        siteId,
      }),
    );

    if (!result.site) {
      throw new NotFoundException('Site not found!');
    }

    return result.site;
  }
}
