import { NextFunction, Request, Response } from 'express';

import { Environment } from '@serv.odin/environment';
import { isObjectId } from '@serv.odin/lib/is.objectid';
import mongoose from 'mongoose';

export function organizationHeader() {
  return (request: Request, _response: Response, next: NextFunction) => {
    const identifier = Environment.variables.ORGANIZATION_HEADER_IDENTIFIER;
    const requestOrg = request.headers[identifier];
    request.organization = isObjectId(requestOrg)
      ? new mongoose.Types.ObjectId(requestOrg)
      : undefined;

    return next();
  };
}