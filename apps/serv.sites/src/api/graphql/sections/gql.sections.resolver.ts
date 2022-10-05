import { PageSectionSchema } from '@app/entities/pages/schemas';
import { gRpcController } from '@app/grpc/grpc.controller';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthAccount,
  CurrentAccount,
  EmptyObjectValidation,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { CreateSectionInput } from './inputs/create.section.input';
import { UpdateSectionFormatInput } from './inputs/update.section.format.input';

@Resolver()
export class GqlSectionsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Query(() => [PageSectionSchema])
  @UseGuards(GqlAuthGuard)
  async sectionList(
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageSectionList({
        pageId,
      }),
    );

    return result.data;
  }

  @Query(() => PageSectionSchema)
  @UseGuards(GqlAuthGuard)
  async section(
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.getPageSection({
        sectionId,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSectionSchema)
  @UseGuards(GqlAuthGuard)
  async createSection(
    @CurrentAccount() account: AuthAccount,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: CreateSectionInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.createSection({
        pageId,
        index: input.index,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSectionSchema)
  @UseGuards(GqlAuthGuard)
  async updateSectionFormat(
    @CurrentAccount() account: AuthAccount,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdateSectionFormatInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionFormat({
        pageId,
        sectionId,
        format: input,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSectionSchema)
  @UseGuards(GqlAuthGuard)
  async updateSectionHead(
    @CurrentAccount() account: AuthAccount,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
    @Args('index')
    index: number,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionIndex({
        index,
        pageId,
        sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => PageSectionSchema)
  @UseGuards(GqlAuthGuard)
  async deleteSection(
    @CurrentAccount() account: AuthAccount,
    @Args('pageId', new ParamValidationPipe([ObjectIdParamValidation]))
    pageId: string,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteSection({
        pageId,
        sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }
}
