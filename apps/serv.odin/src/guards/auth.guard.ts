import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { TOKEN_PASSPORT } from '@serv.odin/modules/auth/strategies/token.strategy';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard(TOKEN_PASSPORT) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }
}
