import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from '@serv.odin/app.module';
import { Environment } from '@serv.odin/environment';
import { LoggingInterceptor } from '@serv.odin/interceptors/logging';
import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from '@serv.odin/interceptors/timeout';
import { bodyParser } from '@serv.odin/middlewares/body.parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { httpsSecurity } from '@serv.odin/middlewares/helmet';
import { organizationHeader } from './middlewares/organization.header';
import { rateLimit } from '@serv.odin/middlewares/rate.limit';
import { setupSwagger } from './swagger';
import { voyager } from '@serv.odin/middlewares/voyager';

const logger = new Logger();
const PORT = Environment.variables.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  // MIDDLEWARES
  app.getHttpAdapter();
  app.use(organizationHeader());
  app.use(setupSwagger(app, PORT));
  app.use(compression());
  app.use(httpsSecurity());
  app.use(bodyParser());
  app.use(rateLimit());
  app.use(cookieParser());
  app.use('/voyager', voyager());

  // INTERCEPTORS
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // NOTE: global nest setup
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  app.enableShutdownHooks();
  await app.listen(PORT);
  return app;
}

bootstrap()
  .then(() => {
    logger.log(`Server running on http://0.0.0.0:${PORT}`);
  })
  .catch((error) => {
    logger.error('Error starting server', error);
    process.exit();
  });