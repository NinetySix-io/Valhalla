import {
  AuthAccount,
  CurrentAccount,
  EmptyObjectValidation,
  EmptyStringValidation,
  GqlAuthGuard,
  ObjectIdParamValidation,
  ParamValidationPipe,
  resolveRpcRequest,
} from '@valhalla/serv.core';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { gRpcController } from '@app/grpc/grpc.controller';
import { SectionSchema } from '@app/entities/sections/schemas';
import { CreateSectionInput } from './inputs/create.section.input';
import { UpdateSectionFormatInput } from './inputs/update.section.format.input';

@Resolver()
export class GqlSectionsResolver {
  constructor(private readonly rpcClient: gRpcController) {}

  @Query(() => [SectionSchema])
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

  @Query(() => SectionSchema)
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

  @Mutation(() => SectionSchema)
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
        head: input.head,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => SectionSchema)
  @UseGuards(GqlAuthGuard)
  async updateSectionFormat(
    @CurrentAccount() account: AuthAccount,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
    @Args('input', new ParamValidationPipe([EmptyObjectValidation]))
    input: UpdateSectionFormatInput,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionFormat({
        sectionId,
        format: input,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => SectionSchema)
  @UseGuards(GqlAuthGuard)
  async updateSectionHead(
    @CurrentAccount() account: AuthAccount,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
    @Args('headId', new ParamValidationPipe([EmptyStringValidation]))
    headId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.updateSectionHead({
        sectionId,
        head: headId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }

  @Mutation(() => SectionSchema)
  @UseGuards(GqlAuthGuard)
  async deleteSection(
    @CurrentAccount() account: AuthAccount,
    @Args('sectionId', new ParamValidationPipe([ObjectIdParamValidation]))
    sectionId: string,
  ) {
    const result = await resolveRpcRequest(
      this.rpcClient.deleteSection({
        sectionId,
        requestedUserId: account.id,
      }),
    );

    return result.data;
  }
}
