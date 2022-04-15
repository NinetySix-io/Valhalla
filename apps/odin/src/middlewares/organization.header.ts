import type { NextFunction, Request, Response } from 'express';

import { BadRequestException } from '@nestjs/common';
import { Environment } from '@odin/config/environment';
import { isObjectId } from '@odin/lib/is.objectid';
import mongoose from 'mongoose';

export function organizationHeader() {
  return (request: Request, _response: Response, next: NextFunction) => {
    const identifier = Environment.variables.ORGANIZATION_HEADER_IDENTIFIER;
    const requestOrg = request.headers[identifier];
    if (!isObjectId(requestOrg)) {
      throw new BadRequestException('Invalid organization data type');
    }

    request.organization = new mongoose.Types.ObjectId(requestOrg);
    return next();
  };
}
