import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWT_PASSPORT } from '@odin/modules/auth/strategies/jwt.strategy';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard(JWT_PASSPORT) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }
}
