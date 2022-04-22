import type { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator } from '@nestjs/common';
import type express from 'express';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request: express.Request = ctx.getContext().req;
    return request.user;
  },
);
