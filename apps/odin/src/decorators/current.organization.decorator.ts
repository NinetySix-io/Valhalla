import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator } from '@nestjs/common';
import express from 'express';

export const CurrentOrganization = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request: express.Request = ctx.getContext().req;
    return request.organization;
  },
);
