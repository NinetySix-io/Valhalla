import type { IncomingMessage, ServerResponse } from 'http';
import { json, urlencoded } from 'body-parser';

import type { NextFunction } from 'express';

export function bodyParser() {
  return (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    const jsonFn = json({
      limit: '50mb',
    });

    const urlEncodedFn = urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    });

    jsonFn(req, res, next);
    urlEncodedFn(req, res, next);
  };
}
