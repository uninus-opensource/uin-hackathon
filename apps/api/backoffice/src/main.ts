/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter, TrpcRouter } from '@psu/api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 3000;
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/trpc`);
}

bootstrap();
