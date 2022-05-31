import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthManager } from '../passport/token.strategy/auth.manager';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Decorator to get refresh token from gql context
 */
export const RefreshToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return new AuthManager(ctx.getContext()).getRefreshToken();
  },
);
