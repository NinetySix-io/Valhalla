import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

export const AccountActiveOrg = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const activeOrg = ctx.getContext().req.user.activeOrg;
    if (!activeOrg) {
      throw new ForbiddenException('Active organization has not been set!');
    }

    return activeOrg;
  },
);
