import { Request, Response } from 'express';

import { Environment } from '@serv.odin/environment';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

export function voyager() {
  if (Environment.isDev) {
    return voyagerMiddleware({
      endpointUrl: `/graphql`,
      displayOptions: {
        skipRelay: false,
        skipDeprecated: false,
      },
    });
  }

  return (_req: Request, res: Response) => res.end();
}
