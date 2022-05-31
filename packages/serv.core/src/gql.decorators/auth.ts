import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthManager } from '../passport/token.strategy/auth.manager';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Gql Decorator that provide AuthManager context
 */
export const Auth = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return new AuthManager(ctx.getContext());
  },
);
