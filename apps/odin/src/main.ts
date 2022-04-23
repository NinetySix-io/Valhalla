import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from '@odin/app.module';
import { Environment } from '@odin/environment';
import { LoggingInterceptor } from '@odin/interceptors/logging';
import { NestFactory } from '@nestjs/core';
import { TimeoutInterceptor } from '@odin/interceptors/timeout';
import { bodyParser } from '@odin/middlewares/body.parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { httpsSecurity } from '@odin/middlewares/helmet';
import mongoose from 'mongoose';
import { organizationHeader } from './middlewares/organization.header';
import { rateLimit } from '@odin/middlewares/rate.limit';
import { setupSwagger } from './swagger';
import { voyager } from '@odin/middlewares/voyager';

/* eslint-disable */
declare const module: any;

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

  if (module.hot) {
    await mongoose.connection?.close();
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}

bootstrap()
  .then(() => {
    logger.log(`Server running on http://0.0.0.0:${PORT}`);
  })
  .catch((error) => {
    logger.error('Error starting server', error);
    process.exit;
  });
