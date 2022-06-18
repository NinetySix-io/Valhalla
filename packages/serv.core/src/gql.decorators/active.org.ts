import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

function getOrganization(context: ExecutionContext): {
  id: string;
  role: string;
} {
  const ctx = GqlExecutionContext.create(context);
  const organization = ctx.getContext().req.user?.organization;
  if (!organization) {
    throw new ForbiddenException('Active organization has not been set!');
  }

  return organization;
}

export const AccountActiveOrg = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getOrganization(context).id;
  },
);

export const AccountActiveOrgRole = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getOrganization(context).role;
  },
);
