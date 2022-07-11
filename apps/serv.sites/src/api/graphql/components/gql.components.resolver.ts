import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards, NotFoundException } from '@nestjs/common';
import {
  AccountActiveOrg,
  AuthAccount,
  CurrentAccount,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { ComponentSchema } from '@app/entities/components/schema';
import { CreateComponentInput } from './inputs/create.component.input';
import { Component } from '@app/protobuf';
import { UpdateComponentInput } from './inputs/update.component.input';

@Resolver()
export class GqlComponentsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Mutation(() => ComponentSchema)
  @UseGuards(GqlAuthGuard)
  async createComponent(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('input') input: CreateComponentInput,
  ): Promise<Component> {
    const result = await resolveRpcRequest(
      this.rpcClient.createComponent({
        ownerId: orgId,
        requestedUserId: account.id,
        name: input.name,
      }),
    );

    return result.component;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateComponent(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    componentId: string,
    @Args('input') input: UpdateComponentInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateComponent({
        componentId,
        ownerId: orgId,
        requestedUserId: account.id,
        name: input.name,
      }),
    );

    if (!result.component) {
      throw new NotFoundException();
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteComponent(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    componentId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteComponent({
        componentId,
        ownerId: orgId,
        requestedUserId: account.id,
      }),
    );

    if (!result.component) {
      throw new NotFoundException();
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async archiveComponent(
    @CurrentAccount() account: AuthAccount,
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    componentId: string,
  ): Promise<boolean> {
    const result = await resolveRpcRequest(
      this.rpcClient.archiveComponent({
        componentId,
        ownerId: orgId,
        requestedUserId: account.id,
      }),
    );

    if (!result.component) {
      throw new NotFoundException();
    }

    return true;
  }

  @Query(() => ComponentSchema)
  @UseGuards(GqlAuthGuard)
  async component(
    @AccountActiveOrg() orgId: string,
    @Args('id', new ParamValidationPipe([ObjectIdParamValidation]))
    componentId: string,
  ): Promise<Component> {
    const result = await resolveRpcRequest(
      this.rpcClient.getComponent({
        ownerId: orgId,
        componentId,
      }),
    );

    if (!result.component) {
      throw new NotFoundException();
    }

    return result.component;
  }

  @Query(() => [ComponentSchema])
  @UseGuards(GqlAuthGuard)
  async componentList(@AccountActiveOrg() orgId: string): Promise<Component[]> {
    const result = await resolveRpcRequest(
      this.rpcClient.getComponentList({
        ownerId: orgId,
      }),
    );

    return result.componentList;
  }
}
