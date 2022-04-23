import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';

@Injectable()
export class OrganizationGuard implements CanActivate {
  // constructor() {} // private readonly memberships: UserMembershipsModel

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.organization) {
      return false;
    }

    //TODO: this is not working ideally
    // const isAllow = await this.memberships.exists({
    //   user: request.user,
    //   group: request.organization,
    //   role: { $in: [UserMembershipRole.OWNER, UserMembershipRole.ADMIN] },
    // });

    return true;
  }
}
