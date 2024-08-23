import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // set logs dir
  if (!existsSync('./logs')) mkdirSync('./logs');

  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
