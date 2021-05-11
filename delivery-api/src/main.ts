import 'dotenv/config';
import * as csurf from 'csurf';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();
  app.use(csurf());
  const port = process.env.PORT || 8000;
  await app.listen(port);

  console.info('App start in port ' + port);
}
bootstrap();
