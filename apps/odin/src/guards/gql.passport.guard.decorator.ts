/* eslint-disable @typescript-eslint/ban-types */

import { UseGuards, applyDecorators } from '@nestjs/common';

import { CanActivate } from '@nestjs/common';
import { GraphqlPassportAuthGuard } from '@odin/guards/auth.guard';

export const GqlGuard = (...extraGuards: (Function | CanActivate)[]) => {
  const guards = [].concat(extraGuards ?? []);
  guards.unshift(GraphqlPassportAuthGuard);
  return applyDecorators(UseGuards(...guards));
};
