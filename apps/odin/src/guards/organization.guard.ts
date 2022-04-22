import type { CanActivate, ExecutionContext } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { UserMembershipRole } from '@odin/data.models/user.memberships/schema';
import type { UserMembershipsModel } from '@odin/data.models/user.memberships';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private readonly memberships: UserMembershipsModel) {}

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
