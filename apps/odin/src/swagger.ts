import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import express from 'express';

export function setupSwagger(app: INestApplication, appPort: number | string) {
  const uri = 'api';
  const options = new DocumentBuilder()
    .setTitle('Odin')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(uri, app, document);
  Logger.log(
    `Load API Documentation at http://localhost:${appPort}/${uri}`,
    'Swagger',
  );

  return (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    next();
  };
}
