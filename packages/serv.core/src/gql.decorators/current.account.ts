import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentAccount = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.account;
  },
);
