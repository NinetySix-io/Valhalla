import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { UserMembershipRole } from '@odin/data.models/user.memberships/schema';
import { UserMembershipsModel } from '@odin/data.models/user.memberships';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly memberships: UserMembershipsModel,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.organization) {
      return false;
    }

    const isAllow = await this.memberships.exists({
      user: request.user,
      group: request.organization,
      role: UserMembershipRole.OWNER,
    });

    return isAllow;
  }
}
